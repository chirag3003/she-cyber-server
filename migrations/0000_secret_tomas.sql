DO $$ BEGIN
 CREATE TYPE "statusenum" AS ENUM('opened', 'assigned', 'processing', 'unsolved', 'solved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "complaint" (
	"id" uuid PRIMARY KEY NOT NULL,
	"complaintID" text NOT NULL,
	"user" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"phoneNo" text NOT NULL,
	"alternatePhoneNo" text,
	"relativeName" text DEFAULT '' NOT NULL,
	"aadharNo" text NOT NULL,
	"complaintType" text NOT NULL,
	"attachments" text[] DEFAULT '{}'::text[] NOT NULL,
	"policeStation" text NOT NULL,
	"offenceTime" text NOT NULL,
	"description" text NOT NULL,
	"referencedBy" text DEFAULT '' NOT NULL,
	"additionalDetails" text DEFAULT '' NOT NULL,
	"suspectDetails" text DEFAULT '' NOT NULL,
	"employee" uuid,
	"assignedOn" text,
	"complaintStatus" "statusenum" DEFAULT 'opened' NOT NULL,
	"createdAt" text NOT NULL,
	CONSTRAINT "complaint_complaintID_unique" UNIQUE("complaintID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "complaintNotes" (
	"id" uuid NOT NULL,
	"complaint" uuid NOT NULL,
	"note" text NOT NULL,
	"createdAt" text NOT NULL,
	"admin" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"employeeID" text NOT NULL,
	"email" text NOT NULL,
	"phoneNo" text NOT NULL,
	"alternatePhoneNo" text NOT NULL,
	"aadharNo" text NOT NULL,
	"createdAt" text NOT NULL,
	"profileImage" text,
	"hash" text NOT NULL,
	"salt" text NOT NULL,
	CONSTRAINT "employee_email_unique" UNIQUE("email"),
	CONSTRAINT "employee_phoneNo_unique" UNIQUE("phoneNo")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"phoneNo" varchar(10) NOT NULL,
	"hash" text NOT NULL,
	"salt" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phoneNo_unique" UNIQUE("phoneNo")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media" (
	"id" uuid PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"key" text NOT NULL,
	"createdAt" varchar(255) NOT NULL,
	"eTag" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complaint" ADD CONSTRAINT "complaint_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complaint" ADD CONSTRAINT "complaint_employee_employee_id_fk" FOREIGN KEY ("employee") REFERENCES "employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complaintNotes" ADD CONSTRAINT "complaintNotes_complaint_complaint_id_fk" FOREIGN KEY ("complaint") REFERENCES "complaint"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
