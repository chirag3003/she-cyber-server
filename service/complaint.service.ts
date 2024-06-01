import { desc, eq } from "drizzle-orm";
import { db } from "../db/db";
import { complaintTable } from "../db/schema/complaint";
import {
  ComplaintStatus,
  CreateComplaintInput,
  CreateComplaintNoteInput,
} from "../validators/complaint.validator";
import { complaintNotesTable } from "../db/schema/complaintNotes";

export class ComplaintService {
  async createComplaint(
    input: CreateComplaintInput,
    userID: string
  ): Promise<void> {
    await db.insert(complaintTable).values({ ...input, user: userID });
  }

  async assignEmployee(complaintID: string, employeeID: string) {
    await db
      .update(complaintTable)
      .set({ employee: employeeID })
      .where(eq(complaintTable.id, complaintID));
  }

  async getComplaintsByUserID(userID: string): Promise<IComplaint[]> {
    return db.query.complaintTable.findMany({
      where: eq(complaintTable.user, userID),
      orderBy: desc(complaintTable.createdAt),
    });
  }

  async getComplaintsByEmployeeID(employeeID: string): Promise<IComplaint[]> {
    console.log(employeeID);
    return db.query.complaintTable.findMany({
      where: eq(complaintTable.employee, employeeID),
    });
  }

  async getAllComplaints(): Promise<IComplaint[]> {
    return db.query.complaintTable.findMany({
      orderBy: complaintTable.createdAt,
    });
  }

  async getComplaintByID(id: string): Promise<IComplaint | null | undefined> {
    return db.query.complaintTable.findFirst({
      where: eq(complaintTable.id, id),
    });
  }

  async updateComplaintStatus(id: string, status: ComplaintStatus) {
    await db
      .update(complaintTable)
      .set({ complaintStatus: status })
      .where(eq(complaintTable.id, id));
  }

  async createComplaintNote(input: CreateComplaintNoteInput, admin: boolean) {
    await db.insert(complaintNotesTable).values({ ...input, admin });
  }

  async getComplaintNotes(complaintID: string): Promise<IComplaintNote[]> {
    return db.query.complaintNotesTable.findMany({
      where: eq(complaintNotesTable.complaint, complaintID),
      orderBy: desc(complaintNotesTable.createdAt),
    });
  }
}
