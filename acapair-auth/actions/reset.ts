"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  const { email } = validatedFields.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "Kullanıcı bulunamadı." };
  }

  return {
    success: "E-posta adresinize şifre sıfırlama bağlantısı gönderildi.",
  };
};
