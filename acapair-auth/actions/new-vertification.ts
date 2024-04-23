"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVertificationTokenByToken } from "@/data/verification-token";
import axios from "axios";

interface VerificationToken {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
}

export const newVerification = async (token: string) => {
  const existingToken = (await getVertificationTokenByToken(
    token,
  )) as VerificationToken;
  if (!existingToken) {
    return { error: "Geçersiz token!" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();
  if (hasExpired) return { error: "Token süresi doldu!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Kullanıcı bulunamadı!" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.vertificationToken.delete({
    where: { id: existingToken.id },
  });

  axios.get(`https://tahinli.com.tr:3434/create/${existingToken.email}`);
  return { success: "E-posta adresiniz doğrulandı!" };
};
