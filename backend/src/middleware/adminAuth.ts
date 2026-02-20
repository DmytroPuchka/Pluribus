/**
 * Admin Authorization Middleware
 * Checks if user has admin privileges
 */

import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors';

/**
 * Check if user is admin
 * Only users with ADMIN role can access admin endpoints
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedError('Authentication required');
    }

    // Check for ADMIN role
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedError('Administrator privileges required');
    }

    next();
  } catch (error) {
    next(error);
  }
};
