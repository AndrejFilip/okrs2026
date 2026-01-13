import { activationSchema, loginSchema } from "@/app/schemas/loginSchema";
import z from "zod";

export type LoginForm = z.infer<typeof loginSchema>;

export type ActivationForm = z.infer<typeof activationSchema>;
