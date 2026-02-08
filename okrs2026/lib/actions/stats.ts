"use server";

import { eq, sum } from "drizzle-orm";
import { db } from "../db";
import { trips } from "../db/schema";

export const getStats = async (userId: number) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const results = await db
      .select({
        kilometers: sum(trips.kilometers),
        elevation: sum(trips.elevation),
        calories: sum(trips.calories),
      })
      .from(trips)
      .where(eq(trips.user_id, userId))
      .then((rows) => rows[0]);

    if (!results) {
      return {
        kilometer: 0,
        elevation: 0,
        calories: 0,
      };
    }

    return {
      kilometers: Number(results.kilometers),
      elevation: Number(results.elevation),
      calories: Number(results.calories),
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw new Error("Internal server error");
  }
};
