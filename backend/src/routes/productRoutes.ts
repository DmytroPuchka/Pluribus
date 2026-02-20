import { Router } from 'express';
import productController from '../controllers/productController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, validateParams, validateQuery } from '../utils/validation';
import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
  productQuerySchema,
} from '../validators/productValidators';

const router = Router();

/**
 * @route   GET /api/v1/products
 * @desc    Get all products with filters
 * @access  Public
 */
router.get(
  '/',
  validateQuery(productQuerySchema),
  productController.getProducts.bind(productController)
);

/**
 * @route   POST /api/v1/products
 * @desc    Create product (seller only)
 * @access  Private (Seller)
 */
router.post(
  '/',
  authenticate,
  authorize('SELLER'),
  validate(createProductSchema),
  productController.createProduct.bind(productController)
);

/**
 * @route   GET /api/v1/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get(
  '/:id',
  validateParams(productIdSchema),
  productController.getProductById.bind(productController)
);

/**
 * @route   PUT /api/v1/products/:id
 * @desc    Update product (seller only)
 * @access  Private (Seller)
 */
router.put(
  '/:id',
  authenticate,
  authorize('SELLER'),
  validateParams(productIdSchema),
  validate(updateProductSchema),
  productController.updateProduct.bind(productController)
);

/**
 * @route   DELETE /api/v1/products/:id
 * @desc    Delete product (seller only)
 * @access  Private (Seller)
 */
router.delete(
  '/:id',
  authenticate,
  authorize('SELLER'),
  validateParams(productIdSchema),
  productController.deleteProduct.bind(productController)
);

export default router;
