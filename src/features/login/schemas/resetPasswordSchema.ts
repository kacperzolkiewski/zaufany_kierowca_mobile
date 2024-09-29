import { TypeOf, object, string } from "zod";

export const resetPasswordSchema = object({
  password: string()
    .min(1, "Hasło jest wymagane")
    .min(8, "Hasło musi mieć więcej niż 8 znaków")
    .max(32, "Hasło musi mieć mniej niż 32 znaki"),
  passwordConfirm: string().min(1, "Proszę potwierdzić hasło"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Podane hasła nie są zgodne",
  path: ["passwordConfirm"],
});

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
