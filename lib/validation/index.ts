import { z } from "zod"

export const SignUpValidation = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})