CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255),
	"description" text,
	CONSTRAINT "event_title_unique" UNIQUE("title"),
	CONSTRAINT "event_slug_unique" UNIQUE("slug")
);
