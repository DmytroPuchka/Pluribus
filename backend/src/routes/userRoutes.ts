import { Router } from 'express';
import userController from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, validateParams } from '../utils/validation';
import { updateProfileSchema, userIdSchema } from '../validators/userValidators';

const router = Router();

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, userController.getCurrentUser.bind(userController));

/**
 * @route   PUT /api/v1/users/me
 * @desc    Update current user profile
 * @access  Private
 */
router.put(
  '/me',
  authenticate,
  validate(updateProfileSchema),
  userController.updateProfile.bind(userController)
);

/**
 * @route   GET /api/v1/users
 * @desc    Get all users (admin only)
 * @access  Private (Admin)
 */
router.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  userController.getAllUsers.bind(userController)
);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get(
  '/:id',
  validateParams(userIdSchema),
  userController.getUserById.bind(userController)
);

/**
 * @route   GET /api/v1/users/:id/stats
 * @desc    Get user statistics
 * @access  Public
 */
router.get(
  '/:id/stats',
  validateParams(userIdSchema),
  userController.getUserStats.bind(userController)
);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user (self or admin)
 * @access  Private
 */
router.delete(
  '/:id',
  authenticate,
  validateParams(userIdSchema),
  userController.deleteUser.bind(userController)
);

export default router;
