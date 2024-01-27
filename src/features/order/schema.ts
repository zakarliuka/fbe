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

export type OrderListSchema = Zod.infer<typeof orderListSchema>;

export const orderListSchema = z.object({
  query: z.object({
    perPage: z
      .string()
      .transform(Number)
      .pipe(z.number().min(10).max(100))
      .optional(),
    page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  }),
});
