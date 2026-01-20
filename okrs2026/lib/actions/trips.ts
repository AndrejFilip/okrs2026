"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { Trip, trips } from "../db/schema";

export const getLastTrip = async (userId: number) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const userTrips = await db.query.trips.findFirst({
      where: eq(trips.user_id, userId),
      orderBy: (trip) => [desc(trip.date)],
    });

    return userTrips;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw new Error("Internal server error");
  }
};

export const getTrips = async (
  userId: number,
  limit: number,
  page: number,
): Promise<{ trips: Trip[] }> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const userTrips = await db.query.trips.findMany({
      where: eq(trips.user_id, userId),
      orderBy: (trip) => [desc(trip.date)],
      limit,
      offset: (page - 1) * limit,
    });
    return {
      trips: userTrips,
    };
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw new Error("Internal server error");
  }
};
