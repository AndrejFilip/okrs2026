import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email je povinný"),
  password: z.string().min(1, "Heslo je povinné"),
});
