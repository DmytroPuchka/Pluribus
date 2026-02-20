import { PrismaClient, Prisma } from '@prisma/client';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../utils/errors';

const prisma = new PrismaClient();

interface CreateReviewData {
  orderId: string;
  revieweeId: string;
  overallRating: number;
  communicationRating: number;
  timelinessRating: number;
  comment?: string;
}

interface GetReviewsQuery {
  page?: string;
  limit?: string;
  minRating?: string;
  maxRating?: string;
}

class ReviewsService {
  /**
   * Create a new review
   */
  async createReview(reviewerId: string, data: CreateReviewData) {
    // Validate ratings (1-5 scale)
    if (
      data.overallRating < 1 ||
      data.overallRating > 5 ||
      data.communicationRating < 1 ||
      data.communicationRating > 5 ||
      data.timelinessRating < 1 ||
      data.timelinessRating > 5
    ) {
      throw new BadRequestError('Ratings must be between 1 and 5');
    }

    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
      select: {
        id: true,
        buyerId: true,
        sellerId: true,
        status: true,
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Check if order is completed
    if (order.status !== 'COMPLETED') {
      throw new BadRequestError('You can only review completed orders');
    }

    // Check if reviewer is part of the order
    if (order.buyerId !== reviewerId && order.sellerId !== reviewerId) {
      throw new UnauthorizedError('You can only review orders you are part of');
    }

    // Check if reviewee is valid
    if (order.buyerId !== data.revieweeId && order.sellerId !== data.revieweeId) {
      throw new BadRequestError('Invalid reviewee');
    }

    // Check if reviewer is trying to review themselves
    if (reviewerId === data.revieweeId) {
      throw new BadRequestError('You cannot review yourself');
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { orderId: data.orderId },
    });

    if (existingReview) {
      throw new BadRequestError('Review already exists for this order');
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        orderId: data.orderId,
        reviewerId,
        revieweeId: data.revieweeId,
        overallRating: data.overallRating,
        communicationRating: data.communicationRating,
        timelinessRating: data.timelinessRating,
        comment: data.comment,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        reviewee: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        order: {
          select: {
            id: true,
            status: true,
            product: {
              select: {
                id: true,
                title: true,
                photos: true,
              },
            },
          },
        },
      },
    });

    // Update reviewee's average rating
    await this.updateUserRating(data.revieweeId);

    return review;
  }

  /**
   * Get reviews with pagination and filters
   */
  async getReviews(query: GetReviewsQuery) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    const where: Prisma.ReviewWhereInput = {};

    // Filter by rating range
    if (query.minRating || query.maxRating) {
      where.overallRating = {};
      if (query.minRating) {
        where.overallRating.gte = parseInt(query.minRating);
      }
      if (query.maxRating) {
        where.overallRating.lte = parseInt(query.maxRating);
      }
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          reviewer: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          reviewee: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          order: {
            select: {
              id: true,
              status: true,
              product: {
                select: {
                  id: true,
                  title: true,
                  photos: true,
                },
              },
            },
          },
        },
      }),
      prisma.review.count({ where }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Get review by ID
   */
  async getReviewById(reviewId: string) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        reviewee: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        order: {
          select: {
            id: true,
            status: true,
            product: {
              select: {
                id: true,
                title: true,
                photos: true,
              },
            },
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    return review;
  }

  /**
   * Get reviews for a specific user (as reviewee)
   */
  async getUserReviews(userId: string, query: GetReviewsQuery) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const where: Prisma.ReviewWhereInput = {
      revieweeId: userId,
    };

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          reviewer: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          order: {
            select: {
              id: true,
              status: true,
              product: {
                select: {
                  id: true,
                  title: true,
                  photos: true,
                },
              },
            },
          },
        },
      }),
      prisma.review.count({ where }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Get reviews for a specific product (via completed orders)
   */
  async getProductReviews(productId: string, query: GetReviewsQuery) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Get all orders for this product
    const orders = await prisma.order.findMany({
      where: {
        productId,
        status: 'COMPLETED',
      },
      select: { id: true },
    });

    const orderIds = orders.map((order) => order.id);

    const where: Prisma.ReviewWhereInput = {
      orderId: { in: orderIds },
    };

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          reviewer: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          reviewee: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.review.count({ where }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Delete review (reviewer only)
   */
  async deleteReview(reviewId: string, reviewerId: string) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.reviewerId !== reviewerId) {
      throw new UnauthorizedError('You can only delete your own reviews');
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    // Update reviewee's average rating
    await this.updateUserRating(review.revieweeId);

    return { message: 'Review deleted successfully' };
  }

  /**
   * Update user's average rating
   */
  private async updateUserRating(userId: string) {
    const reviews = await prisma.review.findMany({
      where: { revieweeId: userId },
      select: { overallRating: true },
    });

    if (reviews.length === 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          rating: null,
          reviewCount: 0,
        },
      });
      return;
    }

    const avgRating =
      reviews.reduce((sum, review) => sum + review.overallRating, 0) / reviews.length;

    await prisma.user.update({
      where: { id: userId },
      data: {
        rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
        reviewCount: reviews.length,
      },
    });
  }
}

export default new ReviewsService();
