import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import passport from 'passport';

// Load environment variables
dotenv.config();

// Import configurations
import { corsOptions } from './config/cors';
import { rateLimiter } from './config/rateLimiter';
import logger from './config/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import { configurePassport } from './config/passport';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import ordersRoutes from './routes/ordersRoutes';
import reviewsRoutes from './routes/reviewsRoutes';
import customOrdersRoutes from './routes/customOrdersRoutes';
import adminRoutes from './routes/adminRoutes';

// Import error handler middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app: Application = express();
const server = createServer(app);

// Get port from environment or use default
const PORT = process.env.PORT || 5000;
const API_VERSION = process.env.API_VERSION || 'v1';

// Configure Passport
configurePassport();

// Middleware
app.use(helmet()); // Security headers
app.use(cors(corsOptions)); // CORS configuration
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } })); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(passport.initialize()); // Initialize Passport
app.use(rateLimiter); // Rate limiting

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
app.get(`/api/${API_VERSION}`, (_req: Request, res: Response) => {
  res.json({
    message: 'Pluribus API',
    version: API_VERSION,
    endpoints: {
      health: '/health',
      auth: `/api/${API_VERSION}/auth`,
      users: `/api/${API_VERSION}/users`,
      products: `/api/${API_VERSION}/products`,
      orders: `/api/${API_VERSION}/orders`,
      reviews: `/api/${API_VERSION}/reviews`,
      customOrders: `/api/${API_VERSION}/custom-orders`,
      admin: `/api/${API_VERSION}/admin`,
    },
  });
});

// Mount routes
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/products`, productRoutes);
app.use(`/api/${API_VERSION}/orders`, ordersRoutes);
app.use(`/api/${API_VERSION}/reviews`, reviewsRoutes);
app.use(`/api/${API_VERSION}/custom-orders`, customOrdersRoutes);
app.use(`/api/${API_VERSION}/admin`, adminRoutes);

// Error handling middleware
app.use(notFound); // 404 handler
app.use(errorHandler); // Global error handler

// Graceful shutdown
const gracefulShutdown = async () => {
  logger.info('Received shutdown signal, closing server gracefully...');

  // Disconnect database
  await disconnectDatabase();

  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });

  // Force close after 30s
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    server.listen(PORT, () => {
      logger.info(`🚀 Pluribus Backend API started`);
      logger.info(`📍 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🌐 Server running on http://localhost:${PORT}`);
      logger.info(`📚 API docs: http://localhost:${PORT}/api/${API_VERSION}`);
      logger.info(`❤️  Health check: http://localhost:${PORT}/health`);
      logger.info(`🔐 Auth endpoints: http://localhost:${PORT}/api/${API_VERSION}/auth`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
