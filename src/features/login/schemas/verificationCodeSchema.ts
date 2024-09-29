import { TypeOf, object, string } from "zod";

export const verificationCodeSchema = object({
  verificationCode: string().min(1, "Kod weryfikacyjny jest wymagany"),
});

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>;
