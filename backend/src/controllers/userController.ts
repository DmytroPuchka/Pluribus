import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import { sendSuccess, sendPaginatedResponse } from '../utils/response';

export class UserController {
  /**
   * Get current user profile
   * GET /api/v1/users/me
   */
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const user = await userService.getCurrentUser(userId);

      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update current user profile
   * PUT /api/v1/users/me
   */
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const user = await userService.updateProfile(userId, req.body);

      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   * GET /api/v1/users/:id
   */
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id as string);

      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user statistics
   * GET /api/v1/users/:id/stats
   */
  async getUserStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const stats = await userService.getUserStats(id as string);

      sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user
   * DELETE /api/v1/users/:id
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const requesterId = req.user!.userId;
      const requesterRole = req.user!.role;

      const result = await userService.deleteUser(id as string, requesterId, requesterRole);

      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all users (admin only)
   * GET /api/v1/users
   */
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

      const result = await userService.getAllUsers({
        page: Number(page),
        limit: Number(limit),
        sortBy: sortBy as string,
        sortOrder: sortOrder as 'asc' | 'desc',
      });

      sendPaginatedResponse(
        res,
        result.users,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
