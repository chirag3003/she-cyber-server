ALTER TABLE "complaint" ADD COLUMN "attachments" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "complaintNotes" ADD COLUMN "admin" boolean DEFAULT false;