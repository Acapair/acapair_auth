import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi girin.",
  }),
  password: z.string().min(1, {
    message: "Şifre alanı boş bırakılamaz.",
  }),
});
