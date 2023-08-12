import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import NotAthorizedError from "../errors/not-authorized";

export const requireAuth = (req: Request, res: any, next: NextFunction) => {
  if(!req.currentUser) {
    throw new NotAthorizedError()
  }

  next();
};