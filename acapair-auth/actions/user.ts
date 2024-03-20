import { getUserById, deleteUserById } from "@/data/user";

export const deleteUser = async (id: string) => {
  const user = await getUserById(id);
  await deleteUserById(id);
};
