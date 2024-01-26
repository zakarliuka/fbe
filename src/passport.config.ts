import { JWT_SECRET } from "@/config";
import bcrypt from "bcryptjs";
import { Request } from "express";
import passport from "passport";
import * as jwtStrategy from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { findById, findByUsername } from "./features/user/user.service";

const localOpts = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

const localStrategy = new LocalStrategy(
  localOpts,
  async (req: Request, username: string, password: string, done: Function) => {
    const user = await findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: "Invalid credentials" });
    }

    return done(null, user);
  }
);

passport.use(localStrategy);

const jwtOpts = {
  jwtFromRequest: jwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtStrategyConfig = new jwtStrategy.Strategy(
  jwtOpts,
  async (jwtPayload, done) => {
    const user = await findById(jwtPayload.sub);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  }
);

passport.use(jwtStrategyConfig);

export default passport;
