"use server";
import { getUserById, deleteUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  const user = await getUserById(id);
  await deleteUserById(id);

  axios.get(`https://tahinli.com.tr:3434/${user?.name}`);
};

export const updateUser = async (values: Partial<User>) => {
  const self = await currentUser();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: { id: self?.id },
    data: { ...validData },
  });

  revalidatePath(`/${self?.name}`);
  revalidatePath(`/u/${self?.name}`);

  return user;
};

export const getUser = async (id: string) => {
  return await getUserById(id);
};
