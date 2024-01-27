import { z } from "zod";

export type ProductListParams = Zod.infer<typeof productListSchema>;

export const productListSchema = z.object({
  query: z.object({
    perPage: z
      .string()
      .transform(Number)
      .pipe(z.number().min(10).max(100))
      .optional(),
    page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  }),
});

export type CreateProductsParams = Zod.infer<typeof createProductSchema>;

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    price: z.number().min(0),
    description: z.string(),
    image: z.string(),
  }),
});
