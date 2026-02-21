import { Request, Response, NextFunction } from 'express';
import productService from '../services/productService';
import { sendSuccess, sendPaginatedResponse } from '../utils/response';
import { JwtPayload } from '../types';

export class ProductController {
  /**
   * Create product
   * POST /api/v1/products
   */
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req.user as JwtPayload).userId;
      const product = await productService.createProduct(sellerId, req.body);

      sendSuccess(res, product, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all products
   * GET /api/v1/products
   */
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getProducts(req.query);

      sendPaginatedResponse(
        res,
        result.products,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get product by ID
   * GET /api/v1/products/:id
   */
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id as string);

      sendSuccess(res, product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update product
   * PUT /api/v1/products/:id
   */
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sellerId = (req.user as JwtPayload).userId;
      const product = await productService.updateProduct(id as string, sellerId, req.body);

      sendSuccess(res, product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete product
   * DELETE /api/v1/products/:id
   */
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sellerId = (req.user as JwtPayload).userId;
      const result = await productService.deleteProduct(id as string, sellerId);

      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
