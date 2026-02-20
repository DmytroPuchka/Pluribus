import Joi from 'joi';

export const createReviewSchema = Joi.object({
  orderId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid order ID format',
    'any.required': 'Order ID is required',
  }),
  revieweeId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid reviewee ID format',
    'any.required': 'Reviewee ID is required',
  }),
  overallRating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Overall rating must be a number',
    'number.min': 'Overall rating must be at least 1',
    'number.max': 'Overall rating must be at most 5',
    'any.required': 'Overall rating is required',
  }),
  communicationRating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Communication rating must be a number',
    'number.min': 'Communication rating must be at least 1',
    'number.max': 'Communication rating must be at most 5',
    'any.required': 'Communication rating is required',
  }),
  timelinessRating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Timeliness rating must be a number',
    'number.min': 'Timeliness rating must be at least 1',
    'number.max': 'Timeliness rating must be at most 5',
    'any.required': 'Timeliness rating is required',
  }),
  comment: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'Comment must not exceed 1000 characters',
  }),
});

export const reviewIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid review ID format',
    'any.required': 'Review ID is required',
  }),
});

export const userIdSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid user ID format',
    'any.required': 'User ID is required',
  }),
});

export const productIdSchema = Joi.object({
  productId: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid product ID format',
    'any.required': 'Product ID is required',
  }),
});

export const reviewsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  minRating: Joi.number().integer().min(1).max(5).optional(),
  maxRating: Joi.number().integer().min(1).max(5).optional(),
});
