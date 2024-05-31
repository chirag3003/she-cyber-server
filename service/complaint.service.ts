import {eq} from "drizzle-orm";
import {db} from "../db/db";
import {complaintTable} from "../db/schema/complaint";
import {CreateComplaintInput, CreateComplaintNoteInput} from "../validators/complaint.validator";
import {complaintNotesTable} from "../db/schema/complaintNotes";

export class ComplaintService {
    async createComplaint(
        input: CreateComplaintInput,
        userID: string
    ): Promise<void> {
        await db.insert(complaintTable).values({...input, user: userID});
    }

    async getComplaintsByUserID(userID: string): Promise<IComplaint[]> {
        return db.query.complaintTable.findMany({
            where: eq(complaintTable.user, userID),
        });
    }

    async getComplaintsByEmployeeID(employeeID: string): Promise<IComplaint[]> {
        return db.query.complaintTable.findMany({
            where: eq(complaintTable.employee, employeeID),
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

    async createComplaintNote(input: CreateComplaintNoteInput, admin: boolean) {
        await db.insert(complaintNotesTable).values({...input, admin});
    }

    async getComplaintNotes(complaintID: string): Promise<IComplaintNote[]> {
        return db.query.complaintNotesTable.findMany({
            where: eq(complaintNotesTable.complaint, complaintID),
        });
    }
}
