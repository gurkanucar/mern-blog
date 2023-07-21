const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(4).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ abortEarly: false });

module.exports = {
  registerSchema,
};
