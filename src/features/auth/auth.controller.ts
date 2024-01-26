import {
  JWT_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
} from "@/config";
import { UserService } from "@features/user";
import passport from "@src/passport.config";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserCredsParams } from "./schema";

export const login = (req: Request, res: Response, next?: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: unknown, user: { id: number }) => {
      if (err || !user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      const refreshToken = jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRATION,
      });

      return res.json({ accessToken, refreshToken });
    }
  )(req, res, next);
};

export const refresh = (req: Request, res: Response) => {
  const token = req.body.refreshToken;

  jwt.verify(token, JWT_REFRESH_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newRefreshToken = jwt.sign({ sub: decoded.sub }, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRATION,
    });

    const newAccessToken = jwt.sign({ sub: decoded.sub }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

export const register = async (req: Request, res: Response) => {
  const { body: u } = (req as any).parsedData as UserCredsParams;

  if (await UserService.findByUsername(u.username)) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  await UserService.createUser(u);

  return res.status(201).json({ message: "User registered successfully" });
};

export const registerAdmin = async (req: Request, res: Response) => {
  const { body: u } = (req as any).parsedData as UserCredsParams;

  if (await UserService.findByUsername(u.username)) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  await UserService.createUser({ ...u, role: "admin" });

  return res.status(201).json({ message: "User registered successfully" });
};
