/* eslint-disable no-useless-escape */
import coreJoi from 'joi';
import joiDate from '@joi/date';

const Joi = coreJoi.extend(joiDate);
const pattern = /\b[A-Z]{3}\-\d{3}[A-Z]{2}\b/;

export const registerBus = Joi.object().keys({
  number_plate: Joi.string()
    .pattern(new RegExp(pattern))
    .required()
    .min(9)
    .max(9)
    .messages({
      'string.pattern.base': 'invalid plate number format'
    }),
  manufacturer: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.string().required().min(4).max(4),
  capacity: Joi.number().required()
});

export const createTrip = Joi.object().keys({
  bus_id: Joi.string().required(),
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  trip_date: Joi.date().format('YYYY-MM-DD').required(),
  fare: Joi.number().required()
});

export const tripId = Joi.object().keys({
  tripId: Joi.string().required()
});
