import Joi from "joi";

export const AddStaffSchema = Joi.object({
  staffName: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.empty": "Staff name is required",
      "string.min": "Name must be at least 3 characters long",
      "any.required": "Staff name is required",
    }),

  openingTime: Joi.string()
    .required()
    .messages({
      "string.empty": "Opening time is required",
      "any.required": "Opening time is required",
    }),

  closingTime: Joi.string()
    .required()
    .custom((value, helpers) => {
      const { openingTime } = helpers.state.ancestors[0];

      if (openingTime && value <= openingTime) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "string.empty": "Closing time is required",
      "any.invalid": "Closing time must be after opening time",
      "any.required": "Closing time is required",
    }),

  breaks: Joi.array()
    .items(
      Joi.object({
        breakStartTime: Joi.string()
          .required()
          .custom((value, helpers) => {
            const parent = helpers.state.ancestors[1]; 
            const { openingTime, closingTime } = parent;

            if (
              openingTime &&
              closingTime &&
              (value < openingTime || value >= closingTime)
            ) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .messages({
            "string.empty": "Break start is required",
            "any.invalid": "Break start must be within working hours",
            "any.required": "Break start is required",
          }),

        breakEndTime: Joi.string()
          .required()
          .custom((value, helpers) => {
            const breakObj = helpers.state.ancestors[0];
            const parent = helpers.state.ancestors[1];

            const { breakStartTime } = breakObj;
            const { openingTime, closingTime } = parent;

            if (breakStartTime && value <= breakStartTime) {
              return helpers.error("any.after");
            }

            if (
              openingTime &&
              closingTime &&
              (value <= openingTime || value > closingTime)
            ) {
              return helpers.error("any.hours");
            }

            return value;
          })
          .messages({
            "string.empty": "Break end is required",
            "any.after": "Break end must be after break start",
            "any.hours": "Break end must be within working hours",
            "any.required": "Break end is required",
          }),
      })
    )
    .max(5)
    .messages({
      "array.max": "You can add up to 5 break times only",
    }),
}).unknown(true);


// export const EditStaffSchema = Joi.object({
//   staffName: Joi.string()
//     .min(3)
//     .required()
//     .messages({
//       "string.empty": "Staff name is required",
//       "string.min": "Name must be at least 3 characters long",
//       "any.required": "Staff name is required",
//     }),

//   openingTime: Joi.string()
//     .required()
//     .messages({
//       "string.empty": "Opening time is required",
//       "any.required": "Opening time is required",
//     }),

//   closingTime: Joi.string()
//     .required()
//     .custom((value, helpers) => {
//       const { openingTime } = helpers.state.ancestors[0];

//       if (openingTime && value <= openingTime) {
//         return helpers.error("any.invalid");
//       }
//       return value;
//     })
//     .messages({
//       "string.empty": "Closing time is required",
//       "any.invalid": "Closing time must be after opening time",
//       "any.required": "Closing time is required",
//     }),

//   breaks: Joi.array()
//     .items(
//       Joi.object({
//         breakStartTime: Joi.string()
//           .required()
//           .messages({
//             "string.empty": "Break start is required",
//             "any.required": "Break start is required",
//           }),

//         breakEndTime: Joi.string()
//           .required()
//           .custom((value, helpers) => {
//             const { breakStartTime } = helpers.state.ancestors[0];

//             if (breakStartTime && value <= breakStartTime) {
//               return helpers.error("any.after");
//             }
//             return value;
//           })
//           .messages({
//             "string.empty": "Break end is required",
//             "any.after": "Break end must be after start",
//             "any.required": "Break end is required",
//           }),
//       })
//     )
//     .max(5)
//     .custom((breaks, helpers) => {
//       if (!breaks || breaks.length === 0) return breaks;

//       const sorted = [...breaks].sort((a, b) =>
//         a.breakStartTime.localeCompare(b.breakStartTime)
//       );

//       for (let i = 1; i < sorted.length; i++) {
//         if (sorted[i].breakStartTime < sorted[i - 1].breakEndTime) {
//           return helpers.error("array.overlap");
//         }
//       }

//       return breaks;
//     })
//     .messages({
//       "array.max": "You can add up to 5 break times only",
//       "array.overlap": "Breaks cannot overlap",
//     }),

//   isActive: Joi.string()
//     .required()
//     .messages({
//       "string.empty": "Please select active status",
//       "any.required": "Please select active status",
//     }),
// }).unknown(true);