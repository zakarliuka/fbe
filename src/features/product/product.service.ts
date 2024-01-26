import { db, products } from "@/db";

type NewProduct = typeof products.$inferInsert;

export const getProductList = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  return await db.query.products.findMany({
    orderBy: (products, { asc }) => [asc(products.id)],
    limit,
    offset,
  });
};

export const getProductById = async (id: number | string) => {
  if (!id) {
    return null;
  }

  return await db.query.products.findFirst({
    where: (product, { eq }) => eq(product.id, Number(id)),
  });
};

export const createProduct = async (product: NewProduct) => {
  return (await db.insert(products).values(product).returning())[0];
};
