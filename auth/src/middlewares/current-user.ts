import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const currentUser = (req: Request, res: any, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};

interface UserPayload {
    id: string;
    email: string;
  }
  
declare global {
    namespace Express {
        interface Request {
        currentUser?: UserPayload;
        }
    }
}