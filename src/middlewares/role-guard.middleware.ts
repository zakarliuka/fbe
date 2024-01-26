import { user } from "@/db";
import { NextFunction, Request, Response } from "express";

type Role = NonNullable<(typeof user.$inferInsert)["role"]>;

export const roleGuard = (role: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if ((req.user as any)?.role === role) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  };
};
