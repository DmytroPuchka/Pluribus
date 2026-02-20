import { Request, Response, NextFunction } from 'express';
import ordersService from '../services/ordersService';
import { sendSuccess, sendPaginatedResponse } from '../utils/response';

export class OrdersController {
  /**
   * Create order
   * POST /api/v1/orders
   */
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const buyerId = req.user!.userId;
      const order = await ordersService.createOrder(buyerId, req.body);

      sendSuccess(res, order, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all orders (with filters)
   * GET /api/v1/orders
   */
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await ordersService.getOrders(userId, req.query);

      sendPaginatedResponse(
        res,
        result.orders,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get order by ID
   * GET /api/v1/orders/:id
   */
  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const order = await ordersService.getOrderById(id, userId);

      sendSuccess(res, order);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update order status (seller only)
   * PATCH /api/v1/orders/:id/status
   */
  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sellerId = req.user!.userId;
      const { status, trackingNumber } = req.body;

      const order = await ordersService.updateOrderStatus(
        id,
        sellerId,
        status,
        trackingNumber
      );

      sendSuccess(res, order);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Cancel order (buyer only)
   * POST /api/v1/orders/:id/cancel
   */
  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const buyerId = req.user!.userId;
      const order = await ordersService.cancelOrder(id, buyerId);

      sendSuccess(res, order);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get order statistics
   * GET /api/v1/orders/stats
   */
  async getOrderStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const stats = await ordersService.getOrderStats(userId);

      sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrdersController();
