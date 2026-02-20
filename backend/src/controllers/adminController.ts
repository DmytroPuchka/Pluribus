/**
 * Admin Controller
 * HTTP request handlers for admin endpoints
 */

import { Request, Response, NextFunction } from 'express';
import adminService from '../services/adminService';
import { formatSuccessResponse } from '../utils/response';

/**
 * Get platform statistics
 * GET /api/v1/admin/stats
 */
export const getPlatformStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await adminService.getPlatformStats();
    res.json(formatSuccessResponse(stats));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users
 * GET /api/v1/admin/users
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filters = {
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      role: req.query.role as string | undefined,
      isActive: req.query.isActive ? req.query.isActive === 'true' : undefined,
      search: req.query.search as string | undefined,
    };

    const result = await adminService.getAllUsers(filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle user status (block/unblock)
 * PATCH /api/v1/admin/users/:id/status
 */
export const toggleUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await adminService.toggleUserStatus(id, isActive);
    res.json(formatSuccessResponse(user));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * DELETE /api/v1/admin/users/:id
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await adminService.deleteUser(req.params.id);
    res.json(formatSuccessResponse(result));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products
 * GET /api/v1/admin/products
 */
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filters = {
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      isActive: req.query.isActive ? req.query.isActive === 'true' : undefined,
      search: req.query.search as string | undefined,
    };

    const result = await adminService.getAllProducts(filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle product status
 * PATCH /api/v1/admin/products/:id/status
 */
export const toggleProductStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const product = await adminService.toggleProductStatus(id, isActive);
    res.json(formatSuccessResponse(product));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product
 * DELETE /api/v1/admin/products/:id
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await adminService.deleteProduct(req.params.id);
    res.json(formatSuccessResponse(result));
  } catch (error) {
    next(error);
  }
};
