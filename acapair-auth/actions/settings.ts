"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import axios from "axios";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Erişim izni yok." };
  }

  // @ts-ignore
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Kullanıcı bulunamadı." };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  axios.get(
    `https://tahinli.com.tr:3434/change-username/${dbUser.email}/${values.email}`,
  );

  return { success: "Ayarlar güncellendi." };
};
