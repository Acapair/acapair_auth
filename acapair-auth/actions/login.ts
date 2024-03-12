"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVertificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVertificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validate fields
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz alanlar!" };
  }

  // Destructure email and password from validated fields
  const { email, password } = validatedFields.data;
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

  // If user's email is verified, try to sign in
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.message) {
        case "CredentialsSignin":
          return { error: "Kullanıcı adı veya şifre hatalı!" };
        default:
          return { error: "Bir hata oluştu!" };
      }
    }
    throw error;
  }
};
