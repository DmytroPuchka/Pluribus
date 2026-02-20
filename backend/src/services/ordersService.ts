import { PrismaClient, OrderStatus, Prisma } from '@prisma/client';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../utils/errors';

const prisma = new PrismaClient();

interface CreateOrderData {
  productId?: string;
  customOrderId?: string;
  price: number;
  currency: string;
  deliveryAddress: string;
}

interface GetOrdersQuery {
  role?: 'buyer' | 'seller';
  status?: OrderStatus;
  page?: string;
  limit?: string;
}

class OrdersService {
  /**
   * Create a new order
   */
  async createOrder(buyerId: string, data: CreateOrderData) {
    // Validate that either productId or customOrderId is provided
    if (!data.productId && !data.customOrderId) {
      throw new BadRequestError('Either productId or customOrderId is required');
    }

    let sellerId: string;
    let price: number;
    let currency: string;

    // If ordering a product
    if (data.productId) {
      const product = await prisma.product.findUnique({
        where: { id: data.productId },
        select: { sellerId: true, price: true, currency: true, isAvailable: true },
      });

      if (!product) {
        throw new NotFoundError('Product not found');
      }

      if (!product.isAvailable) {
        throw new BadRequestError('Product is not available');
      }

      sellerId = product.sellerId;
      price = Number(product.price);
      currency = product.currency;
    }
    // If ordering a custom order
    else if (data.customOrderId) {
      const customOrder = await prisma.customOrder.findUnique({
        where: { id: data.customOrderId },
        select: { buyerId: true, sellerId: true, estimatedPrice: true, status: true },
      });

      if (!customOrder) {
        throw new NotFoundError('Custom order not found');
      }

      if (customOrder.status !== 'ACCEPTED') {
        throw new BadRequestError('Custom order must be accepted before creating an order');
      }

      if (customOrder.buyerId !== buyerId) {
        throw new UnauthorizedError('You can only create orders for your own custom orders');
      }

      sellerId = customOrder.sellerId;
      price = Number(customOrder.estimatedPrice);
      currency = data.currency || 'USD';
    } else {
      throw new BadRequestError('Invalid order data');
    }

    // Prevent buyers from ordering their own products
    if (buyerId === sellerId) {
      throw new BadRequestError('You cannot order your own products');
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        buyerId,
        sellerId,
        productId: data.productId,
        customOrderId: data.customOrderId,
        price,
        currency,
        deliveryAddress: data.deliveryAddress,
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
        product: {
          select: {
            id: true,
            title: true,
            description: true,
            photos: true,
            price: true,
            currency: true,
            category: true,
          },
        },
      },
    });

    return order;
  }

  /**
   * Get orders with pagination and filters
   */
  async getOrders(userId: string, query: GetOrdersQuery) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};

    // Filter by role
    if (query.role === 'buyer') {
      where.buyerId = userId;
    } else if (query.role === 'seller') {
      where.sellerId = userId;
    } else {
      // Show all orders where user is either buyer or seller
      where.OR = [{ buyerId: userId }, { sellerId: userId }];
    }

    // Filter by status
    if (query.status) {
      where.status = query.status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              photos: true,
              price: true,
              currency: true,
              category: true,
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders,
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
   * Get order by ID
   */
  async getOrderById(orderId: string, userId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
        product: {
          select: {
            id: true,
            title: true,
            description: true,
            photos: true,
            price: true,
            currency: true,
            category: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Check if user is buyer or seller
    if (order.buyerId !== userId && order.sellerId !== userId) {
      throw new UnauthorizedError('You do not have access to this order');
    }

    return order;
  }

  /**
   * Update order status (seller only)
   */
  async updateOrderStatus(
    orderId: string,
    sellerId: string,
    status: OrderStatus,
    trackingNumber?: string
  ) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (order.sellerId !== sellerId) {
      throw new UnauthorizedError('Only the seller can update order status');
    }

    // Validate status transitions
    if (order.status === 'CANCELLED' || order.status === 'COMPLETED') {
      throw new BadRequestError('Cannot update a cancelled or completed order');
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        trackingNumber: trackingNumber || order.trackingNumber,
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
        product: {
          select: {
            id: true,
            title: true,
            description: true,
            photos: true,
            price: true,
            currency: true,
            category: true,
          },
        },
      },
    });

    return updatedOrder;
  }

  /**
   * Cancel order (buyer only, before shipped)
   */
  async cancelOrder(orderId: string, buyerId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (order.buyerId !== buyerId) {
      throw new UnauthorizedError('Only the buyer can cancel their order');
    }

    if (order.status === 'SHIPPED' || order.status === 'DELIVERED' || order.status === 'COMPLETED') {
      throw new BadRequestError('Cannot cancel an order that has been shipped or delivered');
    }

    if (order.status === 'CANCELLED') {
      throw new BadRequestError('Order is already cancelled');
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
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
        product: {
          select: {
            id: true,
            title: true,
            description: true,
            photos: true,
            price: true,
            currency: true,
            category: true,
          },
        },
      },
    });

    return updatedOrder;
  }

  /**
   * Get order statistics
   */
  async getOrderStats(userId: string) {
    const [
      totalOrders,
      totalAsБуyer,
      totalAsSeller,
      pendingOrders,
      completedOrders,
      totalRevenue,
    ] = await Promise.all([
      // Total orders (as buyer or seller)
      prisma.order.count({
        where: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
        },
      }),
      // Total as buyer
      prisma.order.count({
        where: { buyerId: userId },
      }),
      // Total as seller
      prisma.order.count({
        where: { sellerId: userId },
      }),
      // Pending orders
      prisma.order.count({
        where: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
          status: {
            in: ['PENDING', 'ACCEPTED', 'PAID', 'SHIPPED'],
          },
        },
      }),
      // Completed orders
      prisma.order.count({
        where: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
          status: 'COMPLETED',
        },
      }),
      // Total revenue as seller
      prisma.order.aggregate({
        where: {
          sellerId: userId,
          status: 'COMPLETED',
        },
        _sum: {
          price: true,
        },
      }),
    ]);

    return {
      totalOrders,
      totalAsBuyer,
      totalAsSeller,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue._sum.price || 0,
    };
  }
}

export default new OrdersService();
