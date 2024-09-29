import { TypeOf, object, string } from "zod";

export const forgotPasswordSchema = object({
  email: string()
    .min(1, "Adres e-mail jest wymagany")
    .email("Niepoprawny adres e-mail"),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;
