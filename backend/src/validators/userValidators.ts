import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().allow('', null).optional(),
  bio: Joi.string().max(500).allow('', null).optional(),
  country: Joi.string().min(2).optional(),
  city: Joi.string().min(2).optional(),
  address: Joi.string().allow('', null).optional(),
  avatar: Joi.string().uri().allow('', null).optional(),
  role: Joi.string().valid('BUYER', 'SELLER', 'ADMIN').optional(),
  deliveryCountries: Joi.array().items(Joi.string()).optional(),
});

export const userIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid user ID format',
    'any.required': 'User ID is required',
  }),
});
