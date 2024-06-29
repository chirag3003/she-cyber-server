import {randomUUID} from "crypto";
import {pgTable, uuid, text, pgEnum, serial} from "drizzle-orm/pg-core";
import {userTable} from "./user";
import {employeeTable} from "./employee";
import {sql} from "drizzle-orm";

export const statusEnum = pgEnum("statusenum", [
    "opened",
    "assigned",
    "processing",
    "unsolved",
    "solved",
]);

export const complaintTable = pgTable("complaint", {
    id: uuid("id")
        .primaryKey()
        .$default(() => randomUUID()),
    seqnum: serial("seqnum"),
    complaintID: text("complaintID"),
    user: uuid("user")
        .notNull()
        .references(() => userTable.id),
    name: text("name").notNull(),
    email: text("email").notNull().default(""),
    phoneNo: text("phoneNo").notNull(),
    alternatePhoneNo: text("alternatePhoneNo"),
    relativeName: text("relativeName").notNull().default(""),
    aadharNo: text("aadharNo").notNull(),
    complaintType: text("complaintType").notNull(),
    attachments: text("attachments")
        .array()
        .notNull()
        .default(sql`'{}'::text[]`),
    policeStation: text("policeStation").notNull(),
    offenceTime: text("offenceTime").notNull(),
    description: text("description").notNull(),
    referencedBy: text("referencedBy").notNull().default(""),
    additionalDetails: text("additionalDetails").notNull().default(""),
    suspectDetails: text("suspectDetails").notNull().default(""),
    employee: uuid("employee").references(() => employeeTable.id),
    assignedOn: text("assignedOn"),
    complaintStatus: statusEnum("complaintStatus").notNull().default("opened"),
    createdAt: text("createdAt")
        .notNull()
        .$default(() => new Date().toISOString()),
});

export type InsertComplaint = typeof complaintTable.$inferInsert;
export type SelectComplaint = typeof complaintTable.$inferSelect;
