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
