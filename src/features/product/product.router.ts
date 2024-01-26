import { authenticateJWT, roleGuard, validate } from "@src/middlewares";
import { Router } from "express";
import * as ProductController from "./product.controller";
import * as ProductSchemas from "./schema";

const router = Router();

router.get(
  "/",
  validate(ProductSchemas.getProductsSchema),
  ProductController.getProductList
);

router.get("/:id", ProductController.getProductById);

router.post(
  "/create",
  authenticateJWT,
  roleGuard("admin"),
  validate(ProductSchemas.createProductSchema),
  ProductController.createProduct
);

export default router;
