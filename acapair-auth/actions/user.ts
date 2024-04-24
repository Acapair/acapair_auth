import { getUserById, deleteUserById } from "@/data/user";
import axios from "axios";

export const deleteUser = async (id: string) => {
  const user = await getUserById(id);
  await deleteUserById(id);

  axios.get(`https://tahinli.com.tr:3434/delete/${user?.name}`);
};
