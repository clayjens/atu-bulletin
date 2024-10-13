import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

const club = pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  location: varchar("location", { length: 50 }),
  description: varchar("description", { length: 255 }),
  members: varchar("members", { length: 255 }),
});

export default club;
