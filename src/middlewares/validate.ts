import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import logger from "../utils/logger";

interface ValidationSchema {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

export const validate =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {


    const validations = [
      schema.body?.validate(req.body, { abortEarly: false }),
      schema.params?.validate(req.params, { abortEarly: false }),
      schema.query?.validate(req.query, { abortEarly: false }),
    ];

    const errors = validations
      .filter((result): result is NonNullable<typeof result> =>
        Boolean(result?.error)
      )
      .flatMap(({ error }) => error!.details.map((detail) => detail.message));
      
    if (errors.length > 0) {

        logger.error('backend  validation error')
        logger.warn(`${errors}`)
        

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
