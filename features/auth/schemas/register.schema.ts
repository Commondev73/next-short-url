import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters"),
}).refine((data) => data.password === data.password_confirmation, {
  path: ["password_confirmation"],
  message: "Passwords do not match",
});

export type RegisterDto = z.infer<typeof registerSchema>;
