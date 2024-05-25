import {pgTable} from "drizzle-orm/pg-core/table";
import {uuid} from "drizzle-orm/pg-core/columns/uuid";
import {randomUUID} from "node:crypto";
import {text, varchar} from "drizzle-orm/pg-core";

export const mediaTable = pgTable("media", {
    id: uuid("id").primaryKey().$defaultFn(() => randomUUID()),
    url: text("url").notNull(),
    key: text("key").notNull(),
    createdAt: varchar("createdAt", {length: 255}).notNull(),
    eTag: text("eTag"),
})

export type InsertMedia = typeof mediaTable.$inferInsert
export type SelectMedia = typeof mediaTable.$inferSelect