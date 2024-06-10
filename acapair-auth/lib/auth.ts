import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id || "");

  return user?.role;
};
