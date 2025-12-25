

import Joi from "joi";



export const vendorSignupValidationSchema = {
  body: Joi.object({
    shopName: Joi.string()
      .required()
      .min(3)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .messages({
        "any.required": "Shop name is required",
        "string.min": "Shop name must be at least 3 characters",
        "string.pattern.base":
          "Shop name can only contain letters, numbers, and spaces",
      }),

    email: Joi.string()
      .trim()
      .email()
      .required()
      .messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),

    phone: Joi.string()
      .required()
      .pattern(/^[0-9]{10}$/)
      .messages({
        "any.required": "Phone number is required",
        "string.pattern.base":
          "Phone number must be exactly 10 digits",
      }),

    password: Joi.string()
      .required()
      .min(6)
      .pattern(/[A-Z]/)
      .pattern(/[a-z]/)
      .pattern(/[0-9]/)
      .messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.pattern.base":
          "Password must contain uppercase, lowercase, and number",
      }),

    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.required": "Confirm Password is required",
        "any.only": "Passwords must match",
      }),
  }),
};



export const customerSignupValidationSchema ={
     body: Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .custom((value, helpers) => {
        // not only spaces
        if (value.trim().length === 0) {
          return helpers.error("string.onlySpaces");
        }

        // not repeated characters
        if (/^([A-Za-z0-9 ])\1+$/.test(value)) {
          return helpers.error("string.repeated");
        }

        return value;
      })
      .messages({
        "any.required": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.pattern.base":
          "Name can only contain letters, numbers, and spaces",
        "string.onlySpaces": "Name cannot be just spaces",
        "string.repeated": "Name cannot be the same character repeated",
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Invalid email address",
        "any.required": "Email is required",
      }),

    phone: Joi.string()
      .required()
      .pattern(/^[6-9][0-9]{9,14}$/)
      .messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone number is not valid",
      }),

    password: Joi.string()
      .required()
      .min(6)
      .pattern(/[A-Z]/)
      .pattern(/[a-z]/)
      .pattern(/[0-9]/)
      .custom((value, helpers) => {

        if (/^([a-zA-Z0-9@$!%*?&])\1*$/.test(value)) {
          return helpers.error("string.repeated");
        }
        return value;
      })
      .messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.pattern.base":
          "Password must contain uppercase, lowercase, and number",
        "string.repeated":
          "Password cannot be the same character repeated",
      }),
  }),
}