import passport from "@src/passport.config";

export const authenticateJWT = passport.authenticate("jwt", { session: false });
