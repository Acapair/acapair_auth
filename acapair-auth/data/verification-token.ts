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

// Mail sent date and mail id update
export const updateVertificationToken = async (token: string, id: string) => {
  try {
    const vertificationToken = await db.vertificationToken.update({
      where: { token },
      data: {
        emailSentId: id,
        emailSentAt: new Date(),
      },
    });
    return vertificationToken;
  } catch (error) {
    return error;
  }
};
