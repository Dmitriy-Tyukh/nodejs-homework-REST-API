const Joi = require('joi');

const postValidator = (body) => Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }).validate(body);

const putValidator = (body) =>  Joi.object({
    name: Joi.string().alphanum(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).validate(body);

module.exports = {postValidator, putValidator}

