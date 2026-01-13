"use server";

import bcrypt from "bcryptjs";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { User, users } from "../db/schema";
import { ActivationForm } from "../types/types";

export const ActivateUser = async (data: ActivationForm) => {
  const { email, name, bike, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !name || !password) {
    return { status_code: 400, message: "Missing required fields" };
  }

  try {
    const existingUser: User = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0]);

    if (existingUser) {
      return { status_code: 409, message: "User already exists" };
    }

    await db.insert(users).values({
      email,
      name,
      bike: bike || null,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("Activation error:", error);
    return { status_code: 500, message: "Internal server error" };
  }
};
