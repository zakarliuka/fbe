import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "default"] }).default("default"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_At").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(user, ({ many }) => ({
  products: many(products),
  orders: many(userOrder),
}));

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  createdById: integer("created_by")
    .notNull()
    .references(() => user.id),
  image: text("image"),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  createdBy: one(user, {
    fields: [products.createdById],
    references: [user.id],
    relationName: "createdBy",
  }),
  orders: many(userOrderItems),
}));

export const userOrderItems = sqliteTable("user_order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  orderId: integer("order_id")
    .notNull()
    .references(() => userOrder.id),
});

export const userOrderItemsRelations = relations(userOrderItems, ({ one }) => ({
  product: one(products, {
    fields: [userOrderItems.id],
    references: [products.id],
    relationName: "product",
  }),
  order: one(userOrder, {
    fields: [userOrderItems.id],
    references: [userOrder.id],
    relationName: "order",
  }),
}));

export const userOrder = sqliteTable("user_order", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  status: text("status", { enum: ["draft", "paid", "closed"] }).default(
    "draft"
  ),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_At").default(sql`CURRENT_TIMESTAMP`),
});

export const userOrderRelations = relations(userOrder, ({ one, many }) => ({
  user: one(user, {
    fields: [userOrder.id],
    references: [user.id],
    relationName: "user",
  }),
  orderItems: many(userOrderItems),
}));
