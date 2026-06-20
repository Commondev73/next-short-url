import type { Timestamps } from "@/shared/types/common";

export interface User extends Timestamps {
  id: number;
  name: string;
  email: string;
  username: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

export type { RegisterDto } from "../schemas/register.schema";
export type { LoginDto } from "../schemas/login.schema";
