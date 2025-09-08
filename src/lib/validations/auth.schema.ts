import { validationMessages } from "@/lib/messages/validation-messages";
import z from "zod";

export const registerCheckEmailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: validationMessages.email.required })
    .email({ message: validationMessages.email.invalid }),
});

export type RegisterCheckEmailValues = z.infer<typeof registerCheckEmailSchema>;

export const registerSendOtpSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: validationMessages.email.required })
      .email({ message: validationMessages.email.invalid }),
    displayName: z
      .string()
      .nonempty({ message: validationMessages.displayName.required })
      .min(4, validationMessages.displayName.minLength)
      .max(100, validationMessages.displayName.maxLength),
    password: z
      .string()
      .nonempty({ message: validationMessages.password.required })
      .min(6, validationMessages.password.min_length)
      .max(50, validationMessages.password.max_length),
    confirm_password: z
      .string()
      .nonempty({ message: validationMessages.confirm_password.required })
      .min(6, validationMessages.confirm_password.min_length)
      .max(50, validationMessages.confirm_password.max_length),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: validationMessages.confirm_password.not_match,
    path: ["confirm_password"],
  });

export type RegisterSendOtpValues = z.infer<typeof registerSendOtpSchema>;
