ALTER TABLE "complaint" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaint" ALTER COLUMN "relativeName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaint" ALTER COLUMN "additionalDetails" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaint" ALTER COLUMN "suspectDetails" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaint" ADD COLUMN "referencedBy" text DEFAULT '' NOT NULL;