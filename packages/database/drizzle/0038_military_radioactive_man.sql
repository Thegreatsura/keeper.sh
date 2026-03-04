DROP INDEX "calendars_role_idx";--> statement-breakpoint
ALTER TABLE "calendars" ADD COLUMN "capabilities" text[] DEFAULT '{"pull"}' NOT NULL;--> statement-breakpoint
UPDATE "calendars" SET "capabilities" = '{"pull","push"}' WHERE "calendarType" != 'ical';--> statement-breakpoint
CREATE INDEX "calendars_capabilities_idx" ON "calendars" USING btree ("capabilities");--> statement-breakpoint
ALTER TABLE "calendars" DROP COLUMN "role";