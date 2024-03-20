"use server";

import { getUserByEmail } from "@/data/user";

export const searchUser = async (search: string) => {
  const user = await getUserByEmail(search);
  return user;
};
