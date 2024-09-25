import { relations } from "drizzle-orm";
import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import event from "./event";
import pin from "./pin";

const user = pgTable(
  "users",
  {
    clerkId: varchar("clerk_id", { length: 255 }).primaryKey(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
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
  createdAt: true,
});

export const selectUserSchema = createSelectSchema(user);

export const userRelations = relations(user, ({ many }) => ({
  events: many(event),
  pins: many(pin),
}));

export default user;
