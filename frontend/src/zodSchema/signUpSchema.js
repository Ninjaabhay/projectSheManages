import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
    
  email: z.string()
    .email("Invalid email address"),

  password: z.string()
    .min(6, "Password must be at least 6 characters"),

  bio: z.string()
    .max(200, "Bio cannot exceed 200 characters")
    .optional(),

    // Will work on this after implementation of Multer
  profile: z.string()
    .url("Profile must be a valid URL")
    .optional(),

  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
});
