import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import event from "./event";
import pin from "./pin";

const user = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    clerkIndex: index().on(table.clerkId),
  })
);

export const insertUserSchema = createInsertSchema(user).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectUserSchema = createSelectSchema(user);

export const userRelations = relations(user, ({ many }) => ({
  events: many(event, { relationName: "hosted_events" }),
  pins: many(pin, { relationName: "pinned_events" }),
}));

export default user;
