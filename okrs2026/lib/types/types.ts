import { loginSchema } from "@/app/schemas/loginSchema";
import z from "zod";

export interface User {
  id: number;
  google_id?: string | null;
  email: string;
  password: string | null; // due to google auth
  name: string;
  bike: string | null;
}

export type LoginForm = z.infer<typeof loginSchema>;
