import { relations } from 'drizzle-orm/';
import {
  decimal,
  pgTable,
  primaryKey,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().$defaultFn(crypto.randomUUID),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    number: varchar('number', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
  },
  (t) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(t.email),
    };
  },
);

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
}));

export const sellers = pgTable(
  'sellers',
  {
    id: uuid('id').primaryKey().$defaultFn(crypto.randomUUID),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    number: varchar('number', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    rutNit: uuid('rut_nit').notNull().unique(),
  },
  (t) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(t.email),
    };
  },
);

export const sellersRelations = relations(sellers, ({ many }) => ({
  products: many(products),
}));

export const delivery = pgTable(
  'delivery',
  {
    id: uuid('id').primaryKey().$defaultFn(crypto.randomUUID),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    number: varchar('number', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    vehicle: varchar('vehicle', { length: 255 }).notNull(),
    plateCode: varchar('plateCode', { length: 255 }).notNull(),
  },
  (t) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(t.email),
    };
  },
);

export const deliveryRelations = relations(delivery, ({ many }) => ({
  orders: many(orders),
}));

export const products = pgTable('products', {
  id: uuid('id').primaryKey().$defaultFn(crypto.randomUUID),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull().unique(),
  price: decimal('price').notNull(),
  userId: uuid('user_id').notNull(),
  sellerId: uuid('seller_id').notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  seller: one(sellers, {
    fields: [products.sellerId],
    references: [sellers.id],
  }),
}));

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().$defaultFn(crypto.randomUUID),
  user_id: uuid('user_id').notNull(),
  seller_id: uuid('seller_id').notNull(),
  delivery_id: uuid('delivery_id').notNull(),
});

export const orderDetails = pgTable(
  'order_products',
  {
    orderId: uuid('order_id').notNull(),
    productId: uuid('product_id').notNull(),
    amount: decimal('amount').notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.orderId, t.productId] }),
  }),
);

export const orderDetailsRelations = relations(orderDetails, ({ one }) => ({
  order: one(orders, {
    fields: [orderDetails.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderDetails.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  seller: one(sellers, {
    fields: [orders.seller_id],
    references: [sellers.id],
  }),
  delivery: one(delivery, {
    fields: [orders.delivery_id],
    references: [delivery.id],
  }),
}));
