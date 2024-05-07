const Joi = require("joi");

module.exports =Joi.object({
    code: Joi.string()
      .regex(/^[a-zA-Z]+[0-9]+$/)
      .message("Invalid code format")
      .required(),
    name: Joi.string().min(4).max(255).required(),
    description: Joi.string().optional(),
  });