import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const events = pgTable("event", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).unique().notNull(),
  slug: varchar("slug", { length: 255 }).unique(),
  description: text("description"),
});

export const InsertEventSchema = createInsertSchema(events);
export const SelectEventSchema = createSelectSchema(events);
