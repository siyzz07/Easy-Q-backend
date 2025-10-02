import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

export const generateJwtToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
};
