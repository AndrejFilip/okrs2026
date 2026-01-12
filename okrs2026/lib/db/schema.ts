import { mysqlTable, varchar, int } from "drizzle-orm/mysql-core";

export const users = mysqlTable("Users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  google_id: varchar("google_id", { length: 255 }),
  email: varchar("email", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  bike: varchar("bike", { length: 255 }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
