import { db, userOrder, userOrderItems } from "@/db";

type Order = typeof userOrder.$inferInsert;
type OrderItems = Omit<typeof userOrderItems.$inferInsert, "orderId" | "price">;

export const getOrderByUserId = (userId: number | string) => {
  return db.query.userOrder.findMany({
    where: (order, { eq }) => eq(order.userId, Number(userId)),
    with: {
      orderItems: true,
    },
  });
};

export const getOrderById = (id: string | number) => {
  if (!id) {
    return null;
  }

  return db.query.userOrder.findFirst({
    where: (order, { eq }) => eq(order.id, Number(id)),
    with: {
      orderItems: true,
    },
  });
};

export const createOrder = async ({
  userId,
  orderItems,
}: {
  userId: number;
  orderItems: OrderItems[];
}) => {
  return await db.transaction(async (tx) => {
    const order = await tx.insert(userOrder).values({ userId }).returning()[0];

    const orderProductsIds = orderItems.map(({ productId }) => productId);

    const productPrices = await tx.query.products.findMany({
      where: (product, { inArray }) => inArray(product.id, orderProductsIds),
    });

    const orderItemsToSave = orderItems.map((item) => {
      const product = productPrices.find((pp) => pp.id === item.productId);
      return {
        ...item,
        price: product?.price || 0,
        orderId: order.id,
      };
    });

    return await tx.insert(userOrderItems).values(orderItemsToSave);
  });
};
