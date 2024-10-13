import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const discount = pgTable("discounts", {
  id: serial("id").primaryKey(),
  business: varchar("business", { length: 100 }).notNull(),
  location: varchar("location", { length: 50 }).notNull(),
  discount: varchar("discount", { length: 50 }),
  expires: timestamp("expires", { mode: "string" }).notNull(),
});

export default discount;
