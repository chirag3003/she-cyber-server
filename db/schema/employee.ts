import {randomUUID} from "crypto";
import {pgTable, text, uuid} from "drizzle-orm/pg-core";

export const employeeTable = pgTable("employee", {
    id: uuid("id")
        .primaryKey()
        .$default(() => randomUUID()),
    name: text("name").notNull(),
    employeeID: text("employeeID").notNull(),
    email: text("email").notNull().unique(),
    phoneNo: text("phoneNo").notNull().unique(),
    alternatePhoneNo: text("alternatePhoneNo").notNull(),
    aadharNo: text("aadharNo").notNull(),
    createdAt: text("createdAt").notNull(),
    profileImage: text("profileImage"),
    hash: text("hash").notNull(),
    salt: text("salt").notNull(),
});

export type InsertEmployee = typeof employeeTable.$inferInsert;
export type SelectEmployee = typeof employeeTable.$inferSelect;
