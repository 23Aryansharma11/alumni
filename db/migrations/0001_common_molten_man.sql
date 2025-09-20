CREATE TYPE "public"."branch" AS ENUM('CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'Finance', 'Marketing', 'HumanResources', 'Operations', 'BusinessAnalytics');--> statement-breakpoint
CREATE TYPE "public"."course" AS ENUM('BTECH', 'MTECH', 'MBA');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "passout_year" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "course" "course";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "branch" "branch";