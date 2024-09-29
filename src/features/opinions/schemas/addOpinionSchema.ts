import { TypeOf, object, string } from "zod";

export const addOpinionSchema = object({
  opinion: string({
    required_error: "Opinia powinna składać się z minimum 20 znaków",
  }).min(20, "Opinia powinna składać się z minimum 20 znaków"),
});

export type AddOpinionInput = TypeOf<typeof addOpinionSchema>;
