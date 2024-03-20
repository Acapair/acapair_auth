"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateVertificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVertificationEmail, sendTwoFactorMail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validate fields
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz alanlar!" };
  }

  // Destructure email and password from validated fields
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: "Kullanıcı bulunamadı!" };
  }

  // If user's email is not verified, generate a new vertification token
  if (!existingUser?.emailVerified) {
    const vertificationToken = await generateVertificationToken(
      existingUser.email
    );
    await sendVertificationEmail(
      vertificationToken.email,
      vertificationToken.token
    );
    return { success: "E-posta adresinizi kontrol edin!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Geçersiz kod!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Geçersiz 2FA kodu!" };
      }

      const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();
      if (hasExpired) {
        return { error: "2FA kodu süresi doldu!" };
      }
      //@ts-ignore
      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        //@ts-ignore
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorMail(existingUser.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  // If user's email is verified, try to sign in
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Kullanıcı adı veya şifre hatalı!" };
    }
    throw error;
  }
};
