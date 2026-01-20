import {
  mysqlTable,
  varchar,
  int,
  float,
  date,
  time,
} from "drizzle-orm/mysql-core";

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

export const stats = mysqlTable("Stats", {
  user_id: int("user_id").primaryKey().notNull(),
  kilometers: float("kilometers").notNull(),
  elevation: float("elevation").notNull(),
  calories: float("calories").notNull(),
});

export type Stat = typeof stats.$inferSelect;
export type NewStat = typeof stats.$inferInsert;

export const trips = mysqlTable("Trips", {
  id: int("id").primaryKey().autoincrement().notNull(),
  user_id: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  kilometers: float("kilometers").notNull(),
  elevation: float("elevation").notNull(),
  calories: float("calories").notNull(),
  time: time("time").notNull(),
});

export type Trip = typeof trips.$inferSelect;
export type NewTrip = typeof trips.$inferInsert;
