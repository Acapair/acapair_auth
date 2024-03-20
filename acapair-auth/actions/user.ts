import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const deleteUserById = async (id: string) => {
  const user = await getUserById(id);
  if (user?.role !== "ADMIN") {
    db.user.delete({ where: { id } });
  } else {
    return new Error("Yönetici kullanıcılar silinemez.");
  }
};
