import { protectSuperadmin, validate } from "@src/middlewares";
import { Router } from "express";
import * as AuthController from "./auth.controller";
import * as AuthSchemas from "./schema";

const router = Router();

router.post("/login", validate(AuthSchemas.userCreds), AuthController.login);

router.post(
  "/unsafe/register-admin",
  protectSuperadmin,
  validate(AuthSchemas.userCreds),
  AuthController.registerAdmin
);

router.post(
  "/register",
  validate(AuthSchemas.userCreds),
  AuthController.register
);

router.post("/refresh", AuthController.refresh);

export default router;
