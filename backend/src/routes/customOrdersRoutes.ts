/**
 * Custom Orders Routes
 * API routes for custom orders management
 */

import { Router } from 'express';
import * as customOrdersController from '../controllers/customOrdersController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createCustomOrderSchema,
  updateCustomOrderStatusSchema,
  customOrderIdSchema,
  customOrdersQuerySchema,
} from '../validators/customOrdersValidators';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/custom-orders
 * @desc    Get all custom orders with filters
 * @access  Private
 */
router.get(
  '/',
  validate(customOrdersQuerySchema, 'query'),
  customOrdersController.getCustomOrders
);

/**
 * @route   POST /api/v1/custom-orders
 * @desc    Create new custom order request
 * @access  Private
 */
router.post(
  '/',
  validate(createCustomOrderSchema, 'body'),
  customOrdersController.createCustomOrder
);

/**
 * @route   GET /api/v1/custom-orders/:id
 * @desc    Get custom order by ID
 * @access  Private
 */
router.get(
  '/:id',
  validate(customOrderIdSchema, 'params'),
  customOrdersController.getCustomOrderById
);

/**
 * @route   PATCH /api/v1/custom-orders/:id/status
 * @desc    Update custom order status (accept/decline/cancel/complete)
 * @access  Private
 */
router.patch(
  '/:id/status',
  validate(customOrderIdSchema, 'params'),
  validate(updateCustomOrderStatusSchema, 'body'),
  customOrdersController.updateCustomOrderStatus
);

/**
 * @route   DELETE /api/v1/custom-orders/:id
 * @desc    Delete custom order (buyer only, if pending/declined)
 * @access  Private
 */
router.delete(
  '/:id',
  validate(customOrderIdSchema, 'params'),
  customOrdersController.deleteCustomOrder
);

export default router;
