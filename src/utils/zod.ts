import zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const formSchema = toTypedSchema(
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
      }),
  })
);
