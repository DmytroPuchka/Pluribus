/**
 * Custom Orders Service
 * Business logic for custom orders management
 */

import { PrismaClient, CustomOrderStatus, DeliveryType } from '@prisma/client';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

interface CreateCustomOrderData {
  buyerId: string;
  sellerId?: string;
  title: string;
  description: string;
  photos?: string[];
  items?: any;
  maxPrice: number;
  currency: string;
  deliveryDeadline?: Date;
  deliveryType: DeliveryType;
}

interface UpdateCustomOrderStatusData {
  status: CustomOrderStatus;
}

interface CustomOrdersFilters {
  role?: 'buyer' | 'seller';
  status?: CustomOrderStatus;
  page?: number;
  limit?: number;
}

class CustomOrdersService {
  /**
   * Create a custom order request
   */
  async createCustomOrder(data: CreateCustomOrderData) {
    // Validate seller exists if provided
    if (data.sellerId) {
      const seller = await prisma.user.findUnique({
        where: { id: data.sellerId },
        select: { id: true, role: true },
      });

      if (!seller) {
        throw new NotFoundError('Seller not found');
      }

      if (seller.role !== 'SELLER') {
        throw new BadRequestError('User is not a seller');
      }

      // Prevent buyers from creating custom orders to themselves
      if (data.buyerId === data.sellerId) {
        throw new BadRequestError('You cannot create a custom order for yourself');
      }
    }

    // Validate delivery deadline if provided
    if (data.deliveryDeadline && new Date(data.deliveryDeadline) < new Date()) {
      throw new BadRequestError('Delivery deadline must be in the future');
    }

    // Create custom order
    const customOrder = await prisma.customOrder.create({
      data: {
        buyerId: data.buyerId,
        sellerId: data.sellerId,
        title: data.title,
        description: data.description,
        photos: data.photos || [],
        items: data.items,
        maxPrice: data.maxPrice,
        currency: data.currency,
        deliveryDeadline: data.deliveryDeadline,
        deliveryType: data.deliveryType,
        status: 'PENDING',
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
      },
    });

    return customOrder;
  }

  /**
   * Get custom orders with filters
   */
  async getCustomOrders(userId: string, filters: CustomOrdersFilters = {}) {
    const { role, status, page = 1, limit = 10 } = filters;

    // Build where clause
    const where: any = {};

    if (role === 'buyer') {
      where.buyerId = userId;
    } else if (role === 'seller') {
      where.sellerId = userId;
    } else {
      // Return all orders where user is either buyer or seller
      where.OR = [
        { buyerId: userId },
        { sellerId: userId },
      ];
    }

    if (status) {
      where.status = status;
    }

    // Get total count
    const total = await prisma.customOrder.count({ where });

    // Calculate pagination
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    // Get custom orders
    const customOrders = await prisma.customOrder.findMany({
      where,
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return {
      data: customOrders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  /**
   * Get custom order by ID
   */
  async getCustomOrderById(customOrderId: string, userId: string) {
    const customOrder = await prisma.customOrder.findUnique({
      where: { id: customOrderId },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
      },
    });

    if (!customOrder) {
      throw new NotFoundError('Custom order not found');
    }

    // Check if user is involved in this custom order
    if (customOrder.buyerId !== userId && customOrder.sellerId !== userId) {
      throw new UnauthorizedError('You do not have permission to view this custom order');
    }

    return customOrder;
  }

  /**
   * Update custom order status (seller can accept/decline, both can cancel)
   */
  async updateCustomOrderStatus(
    customOrderId: string,
    userId: string,
    data: UpdateCustomOrderStatusData
  ) {
    const customOrder = await prisma.customOrder.findUnique({
      where: { id: customOrderId },
      select: {
        id: true,
        buyerId: true,
        sellerId: true,
        status: true,
      },
    });

    if (!customOrder) {
      throw new NotFoundError('Custom order not found');
    }

    // Check if user is involved in this custom order
    if (customOrder.buyerId !== userId && customOrder.sellerId !== userId) {
      throw new UnauthorizedError('You do not have permission to update this custom order');
    }

    const isSeller = customOrder.sellerId === userId;

    // Validate status transitions
    const { status } = data;

    // Only seller can accept or decline
    if ((status === 'ACCEPTED' || status === 'DECLINED') && !isSeller) {
      throw new UnauthorizedError('Only the seller can accept or decline custom orders');
    }

    // Both can cancel, but only if not yet accepted/declined/completed
    if (status === 'CANCELLED') {
      if (!['PENDING', 'ACCEPTED'].includes(customOrder.status)) {
        throw new BadRequestError('Cannot cancel a custom order that is already declined or completed');
      }
    }

    // Only seller can mark as completed
    if (status === 'COMPLETED' && !isSeller) {
      throw new UnauthorizedError('Only the seller can mark custom order as completed');
    }

    // Status must be ACCEPTED before completing
    if (status === 'COMPLETED' && customOrder.status !== 'ACCEPTED') {
      throw new BadRequestError('Custom order must be accepted before it can be completed');
    }

    // Prepare update data
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    // Set timestamp based on status
    if (status === 'ACCEPTED') {
      updateData.acceptedAt = new Date();
    } else if (status === 'DECLINED') {
      updateData.declinedAt = new Date();
    } else if (status === 'COMPLETED') {
      updateData.completedAt = new Date();
    }

    // Update custom order
    const updatedCustomOrder = await prisma.customOrder.update({
      where: { id: customOrderId },
      data: updateData,
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
      },
    });

    return updatedCustomOrder;
  }

  /**
   * Delete custom order (buyer can delete if pending or declined)
   */
  async deleteCustomOrder(customOrderId: string, userId: string) {
    const customOrder = await prisma.customOrder.findUnique({
      where: { id: customOrderId },
      select: {
        id: true,
        buyerId: true,
        status: true,
      },
    });

    if (!customOrder) {
      throw new NotFoundError('Custom order not found');
    }

    // Only buyer can delete
    if (customOrder.buyerId !== userId) {
      throw new UnauthorizedError('Only the buyer can delete custom orders');
    }

    // Can only delete if pending or declined
    if (!['PENDING', 'DECLINED', 'CANCELLED'].includes(customOrder.status)) {
      throw new BadRequestError('Can only delete pending, declined, or cancelled custom orders');
    }

    await prisma.customOrder.delete({
      where: { id: customOrderId },
    });

    return { message: 'Custom order deleted successfully' };
  }
}

export default new CustomOrdersService();
