import Joi from 'joi';

export const signUp = Joi.object().keys({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().required().min(8)
});

export const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
});

export const tokenParam = Joi.object().keys({
  emailToken: Joi.string().required()
});
export const forgotPassword = Joi.object().keys({
  email: Joi.string().email().required()
});

export const resetPasswordToken = Joi.object().keys({
  password_token: Joi.string().required()
});

export const resetPassword = Joi.object().keys({
  password: Joi.string().required().min(8)
});
