import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().optional(),
  bio: Joi.string().max(500).optional(),
  country: Joi.string().min(2).optional(),
  city: Joi.string().min(2).optional(),
  address: Joi.string().optional(),
  avatar: Joi.string().uri().optional(),
  deliveryCountries: Joi.array().items(Joi.string()).optional(),
});

export const userIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid user ID format',
    'any.required': 'User ID is required',
  }),
});
