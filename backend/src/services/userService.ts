import prisma from '../config/database';
import { NotFoundError, ForbiddenError } from '../middleware/errorHandler';
import { PaginationParams } from '../types';
import { UserRole } from '@prisma/client';

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  bio?: string;
  country?: string;
  city?: string;
  address?: string;
  avatar?: string;
  role?: UserRole;
  deliveryCountries?: string[];
}

export class UserService {
  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        bio: true,
        phone: true,
        country: true,
        city: true,
        address: true,
        deliveryCountries: true,
        emailVerified: true,
        phoneVerified: true,
        idVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(userId: string) {
    return this.getUserById(userId);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: UpdateProfileData) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        bio: true,
        phone: true,
        country: true,
        city: true,
        address: true,
        deliveryCountries: true,
        emailVerified: true,
        phoneVerified: true,
        idVerified: true,
        updatedAt: true,
      },
    });

    return user;
  }

  /**
   * Delete user (admin only or self-deletion)
   */
  async deleteUser(userId: string, requesterId: string, requesterRole: string) {
    // Check if user is deleting themselves or is admin
    if (userId !== requesterId && requesterRole !== 'ADMIN') {
      throw new ForbiddenError('You can only delete your own account');
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Soft delete (set isActive to false)
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    return { message: 'User account deleted successfully' };
  }

  /**
   * Get all users (admin only, with pagination)
   */
  async getAllUsers(pagination: PaginationParams) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatar: true,
          country: true,
          city: true,
          emailVerified: true,
          phoneVerified: true,
          idVerified: true,
          isActive: true,
          isSuspended: true,
          createdAt: true,
          lastLoginAt: true,
        },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
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
   * Get user statistics
   */
  async getUserStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            productsAsSeller: true,
            ordersAsBuyer: true,
            ordersAsSeller: true,
            reviewsGiven: true,
            reviewsReceived: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Calculate average rating
    const reviews = await prisma.review.findMany({
      where: { revieweeId: userId },
      select: { overallRating: true },
    });

    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.overallRating, 0) / reviews.length
      : 0;

    return {
      userId: user.id,
      role: user.role,
      productsCount: user._count.productsAsSeller,
      ordersAsBuyer: user._count.ordersAsBuyer,
      ordersAsSeller: user._count.ordersAsSeller,
      reviewsGiven: user._count.reviewsGiven,
      reviewsReceived: user._count.reviewsReceived,
      averageRating: parseFloat(averageRating.toFixed(2)),
    };
  }
}

export default new UserService();
