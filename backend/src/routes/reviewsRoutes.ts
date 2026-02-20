import { Router } from 'express';
import reviewsController from '../controllers/reviewsController';
import { authenticate } from '../middleware/auth';
import { validate, validateParams, validateQuery } from '../utils/validation';
import {
  createReviewSchema,
  reviewIdSchema,
  userIdSchema,
  productIdSchema,
  reviewsQuerySchema,
} from '../validators/reviewsValidators';

const router = Router();

/**
 * @route   GET /api/v1/reviews
 * @desc    Get all reviews with filters
 * @access  Public
 */
router.get(
  '/',
  validateQuery(reviewsQuerySchema),
  reviewsController.getReviews.bind(reviewsController)
);

/**
 * @route   POST /api/v1/reviews
 * @desc    Create review
 * @access  Private
 */
router.post(
  '/',
  authenticate,
  validate(createReviewSchema),
  reviewsController.createReview.bind(reviewsController)
);

/**
 * @route   GET /api/v1/reviews/user/:userId
 * @desc    Get reviews for a specific user
 * @access  Public
 */
router.get(
  '/user/:userId',
  validateParams(userIdSchema),
  validateQuery(reviewsQuerySchema),
  reviewsController.getUserReviews.bind(reviewsController)
);

/**
 * @route   GET /api/v1/reviews/product/:productId
 * @desc    Get reviews for a specific product
 * @access  Public
 */
router.get(
  '/product/:productId',
  validateParams(productIdSchema),
  validateQuery(reviewsQuerySchema),
  reviewsController.getProductReviews.bind(reviewsController)
);

/**
 * @route   GET /api/v1/reviews/:id
 * @desc    Get review by ID
 * @access  Public
 */
router.get(
  '/:id',
  validateParams(reviewIdSchema),
  reviewsController.getReviewById.bind(reviewsController)
);

/**
 * @route   DELETE /api/v1/reviews/:id
 * @desc    Delete review (reviewer only)
 * @access  Private
 */
router.delete(
  '/:id',
  authenticate,
  validateParams(reviewIdSchema),
  reviewsController.deleteReview.bind(reviewsController)
);

export default router;
