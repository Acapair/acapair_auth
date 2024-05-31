"use server";
import { getUserById } from "@/data/user";
import axios from "axios";

export const onFollow = async (curUser: { name: any }, id: string) => {
  //@ts-ignore
  const hostUser = await getUserById(id);

  return await axios.patch(
    `https://tahinli.com.tr:3434/follow/${curUser.name}/${hostUser?.name}`,
  );
};

export const onUnfollow = async (curUser: { name: any }, id: string) => {
  const hostUser = await getUserById(id);

  return await axios.patch(
    `https://tahinli.com.tr:3434/unfollow/${curUser.name}/${hostUser?.name}`,
  );
};
