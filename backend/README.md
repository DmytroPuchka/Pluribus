# Pluribus Backend API

RESTful API for the Pluribus international shipping platform.

## Tech Stack

- **Node.js** (v20+)
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Primary database
- **Prisma** - ORM
- **Redis** - Caching & sessions
- **JWT** - Authentication
- **Winston** - Logging
- **Jest** - Testing

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL 15+
- Redis (optional for development)
- Docker (recommended)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from example:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pluribus"
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
```

### Database Setup

1. Initialize Prisma:
```bash
npm run prisma:generate
```

2. Run migrations:
```bash
npm run prisma:migrate
```

3. (Optional) Open Prisma Studio:
```bash
npm run prisma:studio
```

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will start at `http://localhost:5000`

### Build

Build for production:
```bash
npm run build
```

### Production

Start production server:
```bash
npm start
```

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── cors.ts
│   │   ├── logger.ts
│   │   └── rateLimiter.ts
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── routes/           # API routes
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── response.ts
│   │   └── validation.ts
│   └── server.ts         # Entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── logs/                 # Log files (gitignored)
├── .env                  # Environment variables (gitignored)
├── .env.example          # Environment variables example
├── tsconfig.json         # TypeScript configuration
├── package.json
└── README.md
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Info
- `GET /api/v1` - API information and endpoints

### Authentication (Coming Soon)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Users (Coming Soon)
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/me` - Update current user
- `GET /api/v1/users/:id` - Get user by ID

### Products (Coming Soon)
- `GET /api/v1/products` - List products
- `POST /api/v1/products` - Create product (seller only)
- `GET /api/v1/products/:id` - Get product
- `PUT /api/v1/products/:id` - Update product (seller only)
- `DELETE /api/v1/products/:id` - Delete product (seller only)

## Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_ACCESS_SECRET` - JWT secret for access tokens
- `JWT_REFRESH_SECRET` - JWT secret for refresh tokens
- `CORS_ORIGIN` - Allowed CORS origins

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Lint code
- `npm run lint:fix` - Lint and fix code
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

Error response format:
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  },
  "meta": {
    "timestamp": "2026-02-20T00:00:00.000Z"
  }
}
```

## Success Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-02-20T00:00:00.000Z"
  }
}
```

## Logging

Logs are written to:
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

In development, logs are also output to console with colors.

## Rate Limiting

- Default: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes

## Security

- Helmet.js for security headers
- CORS configured for specific origins
- Rate limiting on all endpoints
- JWT authentication
- Password hashing with bcrypt
- Input validation with Joi

## Docker Support

Coming soon: Docker and docker-compose configuration for easy deployment.

## Testing

Coming soon: Unit and integration tests with Jest.

## License

MIT
