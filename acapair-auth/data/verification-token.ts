import { db } from "@/lib/db";

// Generate a new vertification token
export const getVertificationTokenByEmail = async (email: string) => {
  try {
    const vertificationToken = await db.vertificationToken.findFirst({
      where: { email },
    });
    return vertificationToken;
  } catch (error) {
    return error;
  }
};

// Get vertification token by token
export const getVertificationTokenByToken = async (token: string) => {
  try {
    const vertificationToken = await db.vertificationToken.findUnique({
      where: { token },
    });
    return vertificationToken;
  } catch (error) {
    return error;
  }
};
