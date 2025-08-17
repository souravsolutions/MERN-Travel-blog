import z from "zod"

export const registerUserSchema = z.object({
  fullName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(20, { message: "Name cannot be bigger than 20 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores."
    }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address." })
    .max(30, { message: "Email cannot be bigger than 30 characters." }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(5, { message: "Password must be at least 5 characters." })
    .max(100, { message: "Password cannot be bigger than 100 characters." }),
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(5, { message: "Password must be at least 5 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});