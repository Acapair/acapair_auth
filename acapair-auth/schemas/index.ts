import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;

      if (!data.password && data.newPassword) return false;

      return true;
    },
    {
      message: "Lütfen mevcut şifrenizi veya yeni şifrenizi girin.",
      path: ["newPassword", "password"],
    }
  );

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
