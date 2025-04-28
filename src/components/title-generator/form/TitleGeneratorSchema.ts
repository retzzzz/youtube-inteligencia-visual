
import * as z from "zod";

export const titleGeneratorSchema = z.object({
  keyword: z.string().min(3, {
    message: "Palavra-chave deve ter pelo menos 3 caracteres",
  }),
  language: z.string(),
  emotion: z.string(),
});

export type TitleGeneratorFormValues = z.infer<typeof titleGeneratorSchema>;

export const defaultFormValues: TitleGeneratorFormValues = {
  keyword: "",
  language: "pt",
  emotion: "mix",
};
