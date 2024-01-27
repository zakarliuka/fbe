import { Request, Response } from "express";
import * as OrderService from "./order.service";
import { CreateOrderSchema } from "./schema";

//TODO ADD PAGINATION
export const getOrders = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const orders = await OrderService.getOrderByUserId(userId);

  if (!orders) {
    return res.sendStatus(404);
  }

  return res.json(orders);
};

export const getOrder = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const orderId = req.params.id;
  const order = await OrderService.getOrderById(orderId, userId);

  if (!order) {
    return res.sendStatus(404);
  }

  return res.json(order);
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const { body } = (req as any).parsedData as CreateOrderSchema;

  const order = await OrderService.createOrder({ userId, orderItems: body });

  return res.status(201).json(order);
};
