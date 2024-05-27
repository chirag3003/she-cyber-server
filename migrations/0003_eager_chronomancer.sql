ALTER TABLE "complaint" ALTER COLUMN "complaintStatus" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaintNotes" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaintNotes" ALTER COLUMN "admin" SET NOT NULL;