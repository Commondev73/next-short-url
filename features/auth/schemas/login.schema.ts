import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z.string().min(3, "Email or username is required"),
  password: z.string().min(8, "Password is required"),
});

export type LoginDto = z.infer<typeof loginSchema>;
