import { Request, Response, NextFunction } from 'express';
import reviewsService from '../services/reviewsService';
import { sendSuccess, sendPaginatedResponse } from '../utils/response';

export class ReviewsController {
  /**
   * Create review
   * POST /api/v1/reviews
   */
  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewerId = req.user!.userId;
      const review = await reviewsService.createReview(reviewerId, req.body);

      sendSuccess(res, review, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all reviews (with filters)
   * GET /api/v1/reviews
   */
  async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await reviewsService.getReviews(req.query);

      sendPaginatedResponse(
        res,
        result.reviews,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get review by ID
   * GET /api/v1/reviews/:id
   */
  async getReviewById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const review = await reviewsService.getReviewById(id);

      sendSuccess(res, review);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get reviews for a specific user
   * GET /api/v1/reviews/user/:userId
   */
  async getUserReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const result = await reviewsService.getUserReviews(userId, req.query);

      sendPaginatedResponse(
        res,
        result.reviews,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get reviews for a specific product
   * GET /api/v1/reviews/product/:productId
   */
  async getProductReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const result = await reviewsService.getProductReviews(productId, req.query);

      sendPaginatedResponse(
        res,
        result.reviews,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete review (reviewer only)
   * DELETE /api/v1/reviews/:id
   */
  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reviewerId = req.user!.userId;
      const result = await reviewsService.deleteReview(id, reviewerId);

      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ReviewsController();
