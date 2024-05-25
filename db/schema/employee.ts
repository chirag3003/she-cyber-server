import { randomUUID } from "crypto";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

const employeeTable = pgTable("employee", {
  id: uuid("id")
    .primaryKey()
    .$default(() => randomUUID()),
  name: text("name").notNull(),
  employeeID: text("employeeID").notNull(),
  email: text("email").notNull(),
  phoneNo: text("phoneNo").notNull(),
  alternatePhoneNo: text("alternatePhoneNo"),
  aadharNo: text("aadharNo").notNull(),
  createdAt: text("createdAt").notNull(),
  hash: text("hash").notNull(),
  salt: text("salt").notNull(),
});

export type InsertEmployee = typeof employeeTable.$inferInsert;
export type SelectEmployee = typeof employeeTable.$inferSelect;
