/**
 * Admin Routes
 * API routes for administrative functions
 */

import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';

const router = Router();

// All admin routes require authentication and admin privileges
router.use(authenticate);
router.use(requireAdmin);

/**
 * @route   GET /api/v1/admin/stats
 * @desc    Get platform statistics
 * @access  Admin
 */
router.get('/stats', adminController.getPlatformStats);

/**
 * @route   GET /api/v1/admin/users
 * @desc    Get all users with filters
 * @access  Admin
 */
router.get('/users', adminController.getAllUsers);

/**
 * @route   PATCH /api/v1/admin/users/:id/status
 * @desc    Toggle user status (block/unblock)
 * @access  Admin
 */
router.patch('/users/:id/status', adminController.toggleUserStatus);

/**
 * @route   DELETE /api/v1/admin/users/:id
 * @desc    Delete user
 * @access  Admin
 */
router.delete('/users/:id', adminController.deleteUser);

/**
 * @route   GET /api/v1/admin/products
 * @desc    Get all products with filters
 * @access  Admin
 */
router.get('/products', adminController.getAllProducts);

/**
 * @route   PATCH /api/v1/admin/products/:id/status
 * @desc    Toggle product status (active/inactive)
 * @access  Admin
 */
router.patch('/products/:id/status', adminController.toggleProductStatus);

/**
 * @route   DELETE /api/v1/admin/products/:id
 * @desc    Delete product
 * @access  Admin
 */
router.delete('/products/:id', adminController.deleteProduct);

export default router;
