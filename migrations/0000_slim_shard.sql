DO $$ BEGIN
 CREATE TYPE "statusenum" AS ENUM('opened', 'processing', 'closed', 'unsolved', 'solved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "complaint" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text DEFAULT '',
	"phoneNo" text NOT NULL,
	"alternatePhoneNo" text,
	"relativeName" text DEFAULT '',
	"aadharNo" text NOT NULL,
	"complaintType" text NOT NULL,
	"policeStation" text NOT NULL,
	"offenceTime" text NOT NULL,
	"description" text NOT NULL,
	"additionalDetails" text DEFAULT '',
	"suspectDetails" text DEFAULT '',
	"employee" uuid,
	"complaintStatus" "statusenum" DEFAULT 'opened',
	"createdAt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"employeeID" text NOT NULL,
	"email" text NOT NULL,
	"phoneNo" text NOT NULL,
	"alternatePhoneNo" text,
	"aadharNo" text NOT NULL,
	"createdAt" text NOT NULL,
	"hash" text NOT NULL,
	"salt" text NOT NULL
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
