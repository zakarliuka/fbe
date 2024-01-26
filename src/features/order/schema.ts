import { z } from "zod";

export type CreateOrderSchema = Zod.infer<typeof createOrderSchema>;

export const createOrderSchema = z.object({
  body: z
    .object({
      productId: z.number(),
      quantity: z.number(),
    })
    .array()
    .min(1),
});
