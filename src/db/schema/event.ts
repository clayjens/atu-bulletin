import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import location from "./location";
import user from "./user";

const event = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 512 }),
  slug: varchar("slug", { length: 512 }).notNull().unique(),
  hostId: integer("host_id")
    .notNull()
    .references(() => user.id),
  locationId: integer("location_id")
    .notNull()
    .references(() => location.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(event, {}).omit({
  id: true,
  slug: true,
  hostId: true,
  locationId: true,
  createdAt: true,
  updatedAt: true,
});

export const selectEventSchema = createSelectSchema(event);

export const eventRelations = relations(event, ({ one }) => ({
  host: one(user, {
    fields: [event.hostId],
    references: [user.id],
  }),
  location: one(location, {
    fields: [event.locationId],
    references: [location.id],
  }),
}));

export default event;
