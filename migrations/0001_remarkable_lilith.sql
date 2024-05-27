CREATE TABLE IF NOT EXISTS "complaintNotes" (
	"id" uuid,
	"complaint" uuid NOT NULL,
	"note" text NOT NULL,
	"createdAt" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complaintNotes" ADD CONSTRAINT "complaintNotes_complaint_complaint_id_fk" FOREIGN KEY ("complaint") REFERENCES "complaint"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
