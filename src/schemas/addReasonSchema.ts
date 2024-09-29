import { TypeOf, object, string } from "zod";

export const addReasonSchema = object({
  reason: string({
    required_error: "Powód jest wymagany aby ukończyć anulowanie rezerwacji",
  }).min(20, "Powód powinien składać się z minimum 20 znaków"),
});

export type AddReasonInput = TypeOf<typeof addReasonSchema>;
