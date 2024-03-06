"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { createUser, getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz alanlar!" };
  }

  const { email, password, name } = validatedFields.data;

  // TODO - Pepper the password
  //const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Bu e-posta adresi zaten kullanılıyor." };
  }

  // Create user
  await createUser(email, hashedPassword, name);

  // TODO: Send email verification

  return { success: "Kullanıcı başarılı bir şekilde oluşturuldu." };
};
