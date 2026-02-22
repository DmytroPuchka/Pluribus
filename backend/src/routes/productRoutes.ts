import { Router } from 'express';
import productController from '../controllers/productController';
import { authenticate } from '../middleware/auth';
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
 * @desc    Create product (authenticated users, auto-upgrades to seller)
 * @access  Private
 */
router.post(
  '/',
  authenticate,
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
 * @desc    Update product (owner or admin)
 * @access  Private
 */
router.put(
  '/:id',
  authenticate,
  validateParams(productIdSchema),
  validate(updateProductSchema),
  productController.updateProduct.bind(productController)
);

/**
 * @route   DELETE /api/v1/products/:id
 * @desc    Delete product (owner or admin)
 * @access  Private
 */
router.delete(
  '/:id',
  authenticate,
  validateParams(productIdSchema),
  productController.deleteProduct.bind(productController)
);

export default router;
