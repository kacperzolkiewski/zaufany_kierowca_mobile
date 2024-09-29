import { TypeOf, object, string } from "zod";

export const loginSchema = object({
  email: string()
    .min(1, "Adres e-mail jest wymagany")
    .email("Niepoprawny adres e-mail"),
  password: string()
    .min(1, "Hasło jest wymagane")
    .min(8, "Hasło musi mieć więcej niż 8 znaków")
    .max(32, "Hasło musi mieć mniej niż 32 znaki"),
});

export type LoginInput = TypeOf<typeof loginSchema>;
