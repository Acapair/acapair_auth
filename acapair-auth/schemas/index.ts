import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi girin.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi girin.",
  }),
  password: z.string().min(1, {
    message: "Şifre alanı boş bırakılamaz.",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi girin.",
  }),
  password: z.string().min(6, {
    message: "Şifre alanı 6 karakterden uzun olmalıdır.",
  }),
  name: z.string().min(1, {
    message: "Ad alanı boş bırakılamaz.",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Şifre alanı 6 karakterden uzun olmalıdır.",
  }),
});
