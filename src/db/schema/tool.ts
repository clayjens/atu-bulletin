import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

const tool = pgTable("tools", {
  id: serial("id").primaryKey(),
  major: varchar("major", { length: 50 }).notNull(),
  class: varchar("class", { length: 50 }).notNull(),
  tool1: varchar("tool1", { length: 100 }),
  tool1description: varchar("tool1description", { length: 255 }),
  tool2: varchar("tool2", { length: 100 }),
  tool2description: varchar("tool2description", { length: 255 }),
  tool3: varchar("tool3", { length: 100 }),
  tool3description: varchar("tool3description", { length: 255 }),
  tool4: varchar("tool4", { length: 100 }),
  tool4description: varchar("tool4description", { length: 255 }),
  tool5: varchar("tool5", { length: 100 }),
  tool5description: varchar("tool4description", { length: 255 }),
});

export default tool;
