import * as Joi from 'joi';

export const createSchema = {
  email: Joi.string().required(),
  password: Joi.string().required()
};

export const loginSchema = {
  email: Joi.string().required(),
  password: Joi.string().required()
}
