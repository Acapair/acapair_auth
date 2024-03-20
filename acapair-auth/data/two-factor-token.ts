import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.error(error);
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.error(error);
  }
};

export const updateTwoFactorTokenDateAndId = async (
  token: string,
  messageId: string
) => {
  try {
    await db.twoFactorToken.update({
      where: {
        token,
      },
      data: {
        messageId,
        emailSentAt: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
  }
};
