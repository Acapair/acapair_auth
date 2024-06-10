import { currentUser } from "@/lib/auth";

export const useCurrentRole = async () => {
  const user = await currentUser();

  return user?.role;
};
