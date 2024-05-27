import { randomUUID } from "crypto";
import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";
import { complaintTable } from "./complaint";

export const complaintNotesTable = pgTable("complaintNotes", {
  id: uuid("id").$default(() => randomUUID()),
  complaint: uuid("complaint")
    .notNull()
    .references(() => complaintTable.id),
  note: text("note").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .$default(() => new Date().toISOString()),
  admin: boolean("admin").default(false),
});

export type InsertComplaintNotes = typeof complaintNotesTable.$inferInsert;
export type SelectComplaintNotes = typeof complaintNotesTable.$inferSelect;
