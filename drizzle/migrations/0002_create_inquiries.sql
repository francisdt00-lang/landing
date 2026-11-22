CREATE TABLE "inquiries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "inquiries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "inquiries_name_not_blank" CHECK (char_length(btrim("inquiries"."name")) > 0),
	CONSTRAINT "inquiries_message_length" CHECK (char_length("inquiries"."message") between 10 and 1000)
);
--> statement-breakpoint
ALTER TABLE "inquiries" ENABLE ROW LEVEL SECURITY;