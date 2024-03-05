const Joi = require("joi");

const emailValidator = Joi.string()
  .regex(/^[^A-Z]*$/)
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .messages({
    "string.pattern.base": "Email should not contain uppercase letters",
    "string.email": "Invalid email format",
  })
  .required();

const passwordValidator = Joi.string()
  .regex(/^(?=.*[A-Z])(?=.*\d).+$/)
  .message(
    "Password must contain at least one uppercase letter and one numeric value"
  )
  .required();

const loginValidator = Joi.object({
  email: emailValidator,
  password: passwordValidator,
});

const signupValidator = Joi.object({
  email: emailValidator,
  password: passwordValidator,
  first_name: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .max(50)
    .messages({
      "string.pattern.base":
        "First name cannot contain any special characters and numbers",
    }),
  last_name: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .max(50)
    .messages({
      "string.pattern.base":
        "First name cannot contain any special characters and numbers",
    }),
  gender: Joi.string().valid("male", "female", "others"),
  dob: Joi.date().max("now"),
})
  .unknown()
  .messages({
    "date.max": "Date of birth must be less than today",
  });

module.exports = {
  emailValidator,
  passwordValidator,
  loginValidator,
  signupValidator,
};
