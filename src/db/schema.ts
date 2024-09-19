import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const themeEnum = pgEnum("theme", ["dark", "light"]);
export const roleEnum = pgEnum("role", ["user", "club", "admin"]);

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  role: roleEnum("role").default("user"),
});

export const preferences = pgTable("preferences", {
  id: serial("id").primaryKey(),
  theme: themeEnum("theme").default("dark"),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  preferences: one(preferences),
  events: many(events),
  pins: many(pins),
}));

export const preferencesRelations = relations(preferences, ({ one }) => ({
  user: one(users),
}));

export const events = pgTable("event", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).unique().notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  description: text("description"),
  startDate: timestamp("start_date", { mode: "date", withTimezone: true }),
  endDate: timestamp("end_date", { mode: "date", withTimezone: true }),
  hostId: integer("host_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  locationId: integer("location_id")
    .references(() => locations.id, { onDelete: "cascade" })
    .notNull(),
});

export const eventsRelations = relations(events, ({ one }) => ({
  locations: one(locations),
  host: one(users),
}));

export const locations = pgTable("location", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  zip: varchar("zip", { length: 255 }),
  country: varchar("country", { length: 255 }),
  latitude: varchar("latitude", { length: 255 }),
  longitude: varchar("longitude", { length: 255 }),
});

export const locationsRelations = relations(locations, ({ one }) => ({
  event: one(events),
}));

export const pins = pgTable("pin", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  eventId: integer("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
});

export const pinsRelations = relations(pins, ({ one }) => ({
  user: one(users),
  event: one(events),
}));

export const InsertEventSchema = createInsertSchema(events).omit({
  id: true,
});
export const SelectEventSchema = createSelectSchema(events);
