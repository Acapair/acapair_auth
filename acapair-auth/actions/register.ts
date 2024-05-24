"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { createStream, createUser, getUserByEmail } from "@/data/user";
import { generateVertificationToken } from "@/lib/tokens";
import { sendVertificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz alanlar!" };
  }

  const { email, password, name } = validatedFields.data;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Check if user exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Bu e-posta adresi zaten kullanılıyor." };
  }

  // Create user
  const newUser = await createUser(email, hashedPassword, name);

  // Create stream
  await createStream(`${newUser?.name} Yayını`, newUser, newUser?.id);

  // Generate verification token
  const vertificationToken = await generateVertificationToken(email);

  // Send verification email
  await sendVertificationEmail(
    vertificationToken.email,
    vertificationToken.token,
  );

  return {
    success: "E-posta adresinizi kontrol edin. 😊",
  };
};
