import { authenticateJWT, validate } from "@/src/middlewares";
import { Router } from "express";
import * as OrderController from "./order.controller";
import { createOrderSchema } from "./schema";

const router = Router();

router.get("/", authenticateJWT, OrderController.getOrders);
router.get("/:id", OrderController.getOrder);

router.post(
  "/create",
  authenticateJWT,
  validate(createOrderSchema),
  OrderController.createOrder
);

export default router;
