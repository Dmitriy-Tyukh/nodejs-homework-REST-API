const Joi = require("joi");

const PASSWD_REGEX = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,12}/;

exports.singupUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      avatarURL: Joi.string().required(),
    })
    .validate(data);

exports.loginUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data);


exports.userSubscriptionValidator = (data) => Joi.object()
    .options({abortEarly: false })
    .keys({
      subscription: Joi.string().valid("starter", "pro", "business")
    }).validate(data);