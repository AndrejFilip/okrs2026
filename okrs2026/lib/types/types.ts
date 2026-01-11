import { loginSchema } from "@/app/schemas/loginSchema";
import z from "zod";

export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  bike: string;
  role: string;
}

export type FormState = {
  status_code: number;
  message: string;
  errors?: Record<string, string[]>;
} | null;

export type LoginForm = z.infer<typeof loginSchema>;
