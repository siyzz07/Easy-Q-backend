import jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/common-types";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_ACCESS_TOKEN:string|undefined = process.env.JWT_ACCESS_TOKEN_KEY
const JWT_REFRESH_TOKEN:string|undefined = process.env.JWT_REFRESH_TOKEN_KEY






if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

if (!JWT_ACCESS_TOKEN) {
  throw new Error("JWT_ACCESS_TOKEN is not defined in environment variables");
}

if (!JWT_REFRESH_TOKEN) {
  throw new Error("JWT_REFRESH_TOKEN is not defined in environment variables");
}



export const generateJwtToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
};



export const accessToken = (payload:IJwtPayload) =>{
  return jwt.sign(payload,JWT_ACCESS_TOKEN,{expiresIn:"1m"})
}



export const refreshToken = (payload:IJwtPayload) =>{
  return jwt.sign(payload,JWT_REFRESH_TOKEN,{expiresIn:"7d"})
}