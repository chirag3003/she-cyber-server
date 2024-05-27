import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { complaintTable } from "../db/schema/complaint";
import { CreateComplaintInput } from "../validators/complaint.validator";

export class ComplaintService {
  async createComplaint(
    input: CreateComplaintInput,
    userID: string
  ): Promise<void> {
    await db.insert(complaintTable).values({ ...input, user: userID });
  }

  async getComplaintsByUserID(userID: string): Promise<IComplaint[]> {
    return db.query.complaintTable.findMany({
      where: eq(complaintTable.user, userID),
    });
  }

  async getAllComplaints(): Promise<IComplaint[]> {
    return db.query.complaintTable.findMany();
  }
  async getComplaintByID(id: string): Promise<IComplaint | null | undefined> {
    return db.query.complaintTable.findFirst({
      where: eq(complaintTable.id, id),
    });
  }
}
