const Joi = require("joi");

const orderValidator = Joi.object({
  date: Joi.date().less("now"),
});

module.exports = {
  orderValidator,
};
