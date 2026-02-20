import Joi from 'joi';

export const createOrderSchema = Joi.object({
  productId: Joi.string().uuid().optional(),
  customOrderId: Joi.string().uuid().optional(),
  price: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),
  currency: Joi.string().length(3).uppercase().default('USD'),
  deliveryAddress: Joi.string().min(10).required().messages({
    'string.min': 'Delivery address must be at least 10 characters long',
    'any.required': 'Delivery address is required',
  }),
}).xor('productId', 'customOrderId').messages({
  'object.xor': 'Either productId or customOrderId is required, but not both',
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(
      'PENDING',
      'ACCEPTED',
      'PAID',
      'SHIPPED',
      'DELIVERED',
      'COMPLETED',
      'CANCELLED',
      'DISPUTED'
    )
    .required()
    .messages({
      'any.required': 'Status is required',
      'any.only': 'Invalid order status',
    }),
  trackingNumber: Joi.string().optional(),
});

export const orderIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid order ID format',
    'any.required': 'Order ID is required',
  }),
});

export const ordersQuerySchema = Joi.object({
  role: Joi.string().valid('buyer', 'seller').optional(),
  status: Joi.string()
    .valid(
      'PENDING',
      'ACCEPTED',
      'PAID',
      'SHIPPED',
      'DELIVERED',
      'COMPLETED',
      'CANCELLED',
      'DISPUTED'
    )
    .optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
