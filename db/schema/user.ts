import { pgTable } from "drizzle-orm/pg-core/table";
import { serial, text, varchar } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core/columns/uuid";
import { randomUUID } from "node:crypto";

export const userTable = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  phoneNo: varchar("phoneNo", { length: 10 }).unique().notNull(),
  hash: text("hash").notNull(),
  salt: text("salt").notNull(),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
