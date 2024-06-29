ALTER TABLE "complaint" ALTER COLUMN "complaintID" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "complaint" ADD COLUMN "seqnum" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "complaint" ADD COLUMN "aknowledgementID" text;