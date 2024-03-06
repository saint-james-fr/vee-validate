import { z as zod } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const userFormSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({ required_error: "This field is required" })
      .email({ message: "Must be a valid email" }),
    password: zod
      .string({ required_error: "This field is required" })
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .max(20, {
        message: "Password must be at most 20 characters",
      })
      .refine(
        (value) => {
          return value !== "password";
        },
        { message: "Password cannot be 'password'" }
      ),
  })
);

export const bookFormSchema = toTypedSchema(
  zod.object({
    user_email: zod.string().email().optional(),
    title: zod.string({ required_error: "This field is required" }),
    author: zod.string({ required_error: "This field is required" }),
    year: zod.string({ required_error: "This field is required" }),
    genre: zod.enum([
      "fiction",
      "non-fiction",
      "fantasy",
      "mystery",
      "thriller",
    ]),
  })
);
