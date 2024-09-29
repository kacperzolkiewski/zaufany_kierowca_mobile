import { TypeOf, object, string } from "zod";

export const registerSchema = object({
  name: string().min(1, "Imię i nazwisko jest wymagane").max(100),
  email: string()
    .min(1, "Adres e-mail jest wymagany")
    .email("Niepoprawny adres e-mail"),
  password: string()
    .min(1, "Hasło jest wymagane")
    .min(8, "Hasło musi mieć więcej niż 8 znaków")
    .max(32, "Hasło musi mieć mniej niż 32 znaki"),
  passwordConfirm: string().min(1, "Proszę potwierdzić hasło"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Podane hasła nie są zgodne",
});

export type RegisterInput = TypeOf<typeof registerSchema>;
