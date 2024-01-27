import { authenticateJWT, validate } from "@/src/middlewares";
import { Router } from "express";
import * as OrderController from "./order.controller";
import * as OrderSchema from "./schema";

const router = Router();

router.get(
  "/",
  authenticateJWT,
  validate(OrderSchema.orderListSchema),
  OrderController.getOrders
);
router.get("/:id", authenticateJWT, OrderController.getOrder);

router.post(
  "/create",
  authenticateJWT,
  validate(OrderSchema.createOrderSchema),
  OrderController.createOrder
);

export default router;
