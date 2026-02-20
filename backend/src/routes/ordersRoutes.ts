import { Router } from 'express';
import ordersController from '../controllers/ordersController';
import { authenticate } from '../middleware/auth';
import { validate, validateParams, validateQuery } from '../utils/validation';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  orderIdSchema,
  ordersQuerySchema,
} from '../validators/ordersValidators';

const router = Router();

/**
 * @route   GET /api/v1/orders/stats
 * @desc    Get order statistics
 * @access  Private
 */
router.get(
  '/stats',
  authenticate,
  ordersController.getOrderStats.bind(ordersController)
);

/**
 * @route   GET /api/v1/orders
 * @desc    Get all orders with filters
 * @access  Private
 */
router.get(
  '/',
  authenticate,
  validateQuery(ordersQuerySchema),
  ordersController.getOrders.bind(ordersController)
);

/**
 * @route   POST /api/v1/orders
 * @desc    Create order (buyer only)
 * @access  Private
 */
router.post(
  '/',
  authenticate,
  validate(createOrderSchema),
  ordersController.createOrder.bind(ordersController)
);

/**
 * @route   GET /api/v1/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get(
  '/:id',
  authenticate,
  validateParams(orderIdSchema),
  ordersController.getOrderById.bind(ordersController)
);

/**
 * @route   PATCH /api/v1/orders/:id/status
 * @desc    Update order status (seller only)
 * @access  Private (Seller)
 */
router.patch(
  '/:id/status',
  authenticate,
  validateParams(orderIdSchema),
  validate(updateOrderStatusSchema),
  ordersController.updateOrderStatus.bind(ordersController)
);

/**
 * @route   POST /api/v1/orders/:id/cancel
 * @desc    Cancel order (buyer only)
 * @access  Private (Buyer)
 */
router.post(
  '/:id/cancel',
  authenticate,
  validateParams(orderIdSchema),
  ordersController.cancelOrder.bind(ordersController)
);

export default router;
