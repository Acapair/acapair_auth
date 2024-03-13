"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

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

  const resetToken = await generatePasswordResetToken(email);
  await sendPasswordResetMail(resetToken.email, resetToken.token);

  return {
    success: "Şifre sıfırlama bağlantısı gönderildi. ✨",
  };
};
