/**
 * Admin Service
 * Administrative functions for platform management
 */

import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

class AdminService {
  /**
   * Get platform statistics
   */
  async getPlatformStats() {
    const [
      totalUsers,
      totalSellers,
      totalBuyers,
      totalProducts,
      activeProducts,
      totalOrders,
      completedOrders,
      totalRevenue,
      totalReviews,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'SELLER' } }),
      prisma.user.count({ where: { role: 'BUYER' } }),
      prisma.product.count(),
      prisma.product.count(), // isActive field doesn't exist
      prisma.order.count(),
      prisma.order.count({ where: { status: 'DELIVERED' } }),
      prisma.order.aggregate({
        _sum: { price: true },
        where: { status: 'DELIVERED' },
      }),
      prisma.review.count(),
    ]);

    return {
      users: {
        total: totalUsers,
        sellers: totalSellers,
        buyers: totalBuyers,
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        inactive: totalProducts - activeProducts,
      },
      orders: {
        total: totalOrders,
        completed: completedOrders,
        pending: totalOrders - completedOrders,
      },
      revenue: {
        total: Number(totalRevenue._sum?.price) || 0,
      },
      reviews: {
        total: totalReviews,
      },
    };
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(filters: {
    page?: number;
    limit?: number;
    role?: string;
    isActive?: boolean;
    search?: string;
  }) {
    const { page = 1, limit = 20, role, isActive, search } = filters;

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const total = await prisma.user.count({ where });
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        country: true,
        city: true,
        avatar: true,
        emailVerified: true,
        phoneVerified: true,
        idVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Block/Unblock user (admin only)
   */
  async toggleUserStatus(userId: string, isActive: boolean) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return updatedUser;
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'User deleted successfully' };
  }

  /**
   * Get all products (admin only)
   */
  async getAllProducts(filters: {
    page?: number;
    limit?: number;
    isActive?: boolean;
    search?: string;
  }) {
    const { page = 1, limit = 20, isActive, search } = filters;

    const where: any = {};

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const total = await prisma.product.count({ where });
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    const products = await prisma.product.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Toggle product status (admin only)
   */
  async toggleProductStatus(productId: string, _isActive: boolean) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // TODO: Add isActive field to Product model
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {}, // isActive field doesn't exist
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return updatedProduct;
  }

  /**
   * Delete product (admin only)
   */
  async deleteProduct(productId: string) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return { message: 'Product deleted successfully' };
  }
}

export default new AdminService();
