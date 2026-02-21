/**
 * Custom Orders Controller
 * HTTP request handlers for custom orders endpoints
 */

import { Request, Response, NextFunction } from 'express';
import customOrdersService from '../services/customOrdersService';
import { sendSuccess } from '../utils/response';
import { JwtPayload } from '../types';

/**
 * Create custom order
 * POST /api/v1/custom-orders
 */
export const createCustomOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const buyerId = (req.user as JwtPayload).userId;
    const customOrder = await customOrdersService.createCustomOrder({
      ...req.body,
      buyerId,
    });

    sendSuccess(res, customOrder, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all custom orders with filters
 * GET /api/v1/custom-orders
 */
export const getCustomOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req.user as JwtPayload).userId;
    const filters = {
      role: req.query.role as 'buyer' | 'seller' | undefined,
      status: req.query.status as any,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    };

    const result = await customOrdersService.getCustomOrders(userId, filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get custom order by ID
 * GET /api/v1/custom-orders/:id
 */
export const getCustomOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req.user as JwtPayload).userId;
    const customOrder = await customOrdersService.getCustomOrderById(req.params.id as string, userId);
    sendSuccess(res, customOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * Update custom order status
 * PATCH /api/v1/custom-orders/:id/status
 */
export const updateCustomOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req.user as JwtPayload).userId;
    const customOrder = await customOrdersService.updateCustomOrderStatus(
      req.params.id as string,
      userId,
      req.body
    );
    sendSuccess(res, customOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete custom order
 * DELETE /api/v1/custom-orders/:id
 */
export const deleteCustomOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req.user as JwtPayload).userId;
    const result = await customOrdersService.deleteCustomOrder(req.params.id as string, userId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
