const Joi = require('joi');

const postValidator = (body) => Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().alphanum().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(body);

const putValidator = (body) => Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().alphanum(),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.boolean(),
    })
    .validate(body);

module.exports = {postValidator, putValidator}
