"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt";
import { updatePassword, deletePasswordResetToken } from "@/data/password";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Geçersiz token." };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Geçersiz alanlar." };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Geçersiz token." };

  //@ts-ignore
  const hasExpired = new Date(existingToken.expiresAt) < new Date();
  if (hasExpired) return { error: "Token süresi doldu." };

  //@ts-ignore
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Kullanıcı bulunamadı." };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await updatePassword(existingUser.id, hashedPassword);
  //@ts-ignore
  await deletePasswordResetToken(existingToken.id);

  return { success: "Şifreniz başarıyla güncellendi." };
};
