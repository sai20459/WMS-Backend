const Joi = require("joi");

const productValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  quantity: Joi.number(),
  price: Joi.number(),
  barcode: Joi.number(),
});

module.exports = {
  productValidator,
};
