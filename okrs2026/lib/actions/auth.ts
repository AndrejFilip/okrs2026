"use server";
import { redirect } from "next/navigation";
import { db } from "../db";
import bcrypt from "bcryptjs";
import { FormState, LoginForm, User } from "../types/types";

export const UserLoginAction = async (data: LoginForm): Promise<FormState> => {
  const { email, password } = data;

  if (!email || !password) {
    return { status_code: 400, message: "Bad Request" };
  }

  try {
    const [rows] = await db.execute(`SELECT * FROM Users WHERE email = ?`, [
      email,
    ]);
    const user = rows as User[];

    if (user.length === 0) {
      return { status_code: 401, message: "Wrong credentials" };
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return { status_code: 401, message: "Wrong credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { status_code: 500, message: "Internal Server Error" };
  }

  redirect("/app/dashboard");
};
