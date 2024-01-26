import { SUPERADMIN_TOKEN } from "@/config";
import { NextFunction, Request, Response } from "express";

export const protectSuperadmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").replace(/^bearer /gi, "");

  if (token === SUPERADMIN_TOKEN) {
    return next();
  }

  return res.sendStatus(401);
};
