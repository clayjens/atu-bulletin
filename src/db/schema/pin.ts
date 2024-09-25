import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import event from "./event";
import user from "./user";

const pin = pgTable("pins", {
  userId: varchar("user_id")
    .notNull()
    .references(() => user.clerkId),
  eventId: integer("event_id")
    .notNull()
    .references(() => event.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const insertPinSchema = createInsertSchema(pin).omit({
  createdAt: true,
});

export const selectPinSchema = createSelectSchema(pin);

export const pinRelations = relations(pin, ({ one }) => ({
  user: one(user, {
    fields: [pin.userId],
    references: [user.clerkId],
  }),
  event: one(event, {
    fields: [pin.eventId],
    references: [event.id],
  }),
}));

export default pin;
