import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from './errorHandler';

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};
