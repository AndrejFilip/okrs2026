import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email je povinný"),
  password: z.string().min(1, "Heslo je povinné"),
});

export const activationSchema = z
  .object({
    email: z.string().min(1, "Email je povinný"),
    bike: z.string().optional(),
    name: z.string().min(1, "Meno je povinné"),
    password: z.string().min(1, "Heslo je povinné"),
    retypePassword: z.string().min(1, "Potvrďte heslo"),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Heslá sa nezhodujú",
    path: ["retypePassword"], // kde sa zobrazí error
  });
