/**
 * Custom Orders Validators
 * Joi validation schemas for custom orders endpoints
 */

import Joi from 'joi';

// Create custom order schema
export const createCustomOrderSchema = Joi.object({
  sellerId: Joi.string().uuid().optional(),
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).max(5000).required(),
  photos: Joi.array().items(Joi.string().uri()).max(10).optional(),
  items: Joi.array().items(Joi.object()).optional(),
  maxPrice: Joi.number().positive().required(),
  currency: Joi.string().length(3).uppercase().default('USD'),
  deliveryDeadline: Joi.date().iso().min('now').optional(),
  deliveryType: Joi.string().valid('ASAP', 'DATE').default('ASAP'),
});

// Update custom order status schema
export const updateCustomOrderStatusSchema = Joi.object({
  status: Joi.string().valid('ACCEPTED', 'DECLINED', 'COMPLETED', 'CANCELLED').required(),
});

// Custom order ID schema
export const customOrderIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

// Custom orders query schema
export const customOrdersQuerySchema = Joi.object({
  role: Joi.string().valid('buyer', 'seller').optional(),
  status: Joi.string().valid('PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED', 'CANCELLED').optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
