import Joi from 'joi';

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must not exceed 200 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().min(10).required().messages({
    'string.min': 'Description must be at least 10 characters long',
    'any.required': 'Description is required',
  }),
  photos: Joi.array().items(Joi.string().uri()).min(1).required().messages({
    'array.min': 'At least one photo is required',
    'any.required': 'Photos are required',
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),
  currency: Joi.string().length(3).uppercase().default('USD'),
  category: Joi.string()
    .valid(
      'ELECTRONICS',
      'FASHION',
      'HOME',
      'BEAUTY',
      'SPORTS',
      'BOOKS',
      'TOYS',
      'FOOD',
      'OTHER'
    )
    .required(),
  tags: Joi.array().items(Joi.string()).optional(),
  stockQuantity: Joi.number().integer().min(0).required(),
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().min(10).optional(),
  photos: Joi.array().items(Joi.string().uri()).min(1).optional(),
  price: Joi.number().positive().precision(2).optional(),
  currency: Joi.string().length(3).uppercase().optional(),
  category: Joi.string()
    .valid(
      'ELECTRONICS',
      'FASHION',
      'HOME',
      'BEAUTY',
      'SPORTS',
      'BOOKS',
      'TOYS',
      'FOOD',
      'OTHER'
    )
    .optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  stockQuantity: Joi.number().integer().min(0).optional(),
  isAvailable: Joi.boolean().optional(),
});

export const productIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid product ID format',
    'any.required': 'Product ID is required',
  }),
});

export const productQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  category: Joi.string().optional(),
  minPrice: Joi.number().optional(),
  maxPrice: Joi.number().optional(),
  search: Joi.string().optional(),
  sellerId: Joi.string().uuid().optional(),
  sortBy: Joi.string().valid('createdAt', 'price', 'title').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});
