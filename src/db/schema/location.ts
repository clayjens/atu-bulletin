import { relations } from "drizzle-orm";
import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import event from "./event";

const location = pgTable("locations", {
  id: serial("id").primaryKey(),
  latitude: numeric("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: numeric("longitude", { precision: 10, scale: 7 }).notNull(),
  address: varchar("address", { length: 255 }),
});

export const insertLocationSchema = createInsertSchema(location).omit({
  id: true,
});

export const selectLocationSchema = createSelectSchema(location);

export const locationRelations = relations(location, ({ many }) => ({
  events: many(event, { relationName: "location_events" }),
}));

export default location;
