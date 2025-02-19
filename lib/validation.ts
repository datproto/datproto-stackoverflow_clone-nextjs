import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(30, "First name must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, numbers, and underscores"),
  name: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(30, "Last name must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, numbers, and underscores"),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
})

export const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
})

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "First name must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  bio: z.string().optional(),
  image: z.string().url({
    message: "Invalid image URL"
  }).optional(),
  location: z.string().optional(),
  portfolio: z.string().url({
    message: "Invalid portfolio URL"
  }).optional(),
  reputation: z.coerce.number().optional()
})