import { z } from "zod";
const MIN_USER_PASSWORD_LENGTH = 8
const MAX_USER_PASSWORD_LENGTH = 20

var _MIN_PASSWORD_LENGTH = parseInt(process.env.MIN_USER_PASSWORD_LENGTH) || MIN_USER_PASSWORD_LENGTH 
var _MAX_PASSWORD_LENGTH = parseInt(process.env.MAX_USER_PASSWORD_LENGTH) || MAX_USER_PASSWORD_LENGTH
const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Minimum 2 characters are required" })
      .max(20, { message: "Maximum of 20 characters are allowed" }),
    email: z
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(_MIN_PASSWORD_LENGTH, { message: `Password must be at least ${_MIN_PASSWORD_LENGTH} characters long` })
      .max(_MAX_PASSWORD_LENGTH, { message: `Password must be at most ${_MAX_PASSWORD_LENGTH} characters long` }),
  })
const LoginSchema = z.object({
    email: z
    .email({message: "Invalid email"})
    .min(1, {message: "Email is required"}),
    password: z
    .string()
    .min(_MIN_PASSWORD_LENGTH, { message: `Password must be at least ${_MIN_PASSWORD_LENGTH} characters long` })
    .max(_MAX_PASSWORD_LENGTH, { message: `Password must be at most ${_MAX_PASSWORD_LENGTH} characters long` }),
})
export {LoginSchema,SignupSchema}