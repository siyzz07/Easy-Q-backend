

import Joi from "joi";

export const addAddressSchema = Joi.object({
  address: Joi.string()
    .trim()
    .pattern(/^[A-Za-z0-9\s,.-]+$/)
    .required()
    .messages({
      "string.empty": "Address is required",
      "string.pattern.base": "Invalid characters in address",
      "any.required": "Address is required",
    }),

  city: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "City is required",
      "string.pattern.base": "City can contain only letters",
      "any.required": "City is required",
    }),

  state: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "State is required",
      "string.pattern.base": "State can contain only letters",
      "any.required": "State is required",
    }),

  country: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "Country is required",
      "string.pattern.base": "Country can contain only letters",
      "any.required": "Country is required",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": "Phone must be numbers only",
      "string.min": "Phone must be at least 10 digits",
      "string.max": "Phone can't exceed 15 digits",
      "any.required": "Phone is required",
    }),

  coordinates: Joi.object({
    lat: Joi.number()
      .required()
      .invalid(0)
      .messages({
        "number.base": "Latitude must be a number",
        "any.invalid": "Please select a valid location",
        "any.required": "Latitude required",
      }),

    lng: Joi.number()
      .required()
      .invalid(0)
      .messages({
        "number.base": "Longitude must be a number",
        "any.invalid": "Please select a valid location",
        "any.required": "Longitude required",
      }),
  }).required(),
}).unknown(true);;



export const editAddressSchema = Joi.object({
  address: Joi.string()
    .trim()
    .pattern(/^[A-Za-z0-9\s,.-]+$/)
    .required()
    .messages({
      "string.empty": "Address is required",
      "string.pattern.base": "Invalid characters in address",
      "any.required": "Address is required",
    }),

  city: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "City is required",
      "string.pattern.base": "City can contain only letters",
      "any.required": "City is required",
    }),

  state: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "State is required",
      "string.pattern.base": "State can contain only letters",
      "any.required": "State is required",
    }),

  country: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "Country is required",
      "string.pattern.base": "Country can contain only letters",
      "any.required": "Country is required",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": "Phone must be numbers only",
      "string.min": "Phone must be at least 10 digits",
      "string.max": "Phone can't exceed 15 digits",
      "any.required": "Phone is required",
    }),

}).unknown(true);
