import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    return { error: "Bir hata oluştu." };
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return { error: "Bir hata oluştu." };
  }
};

export const updateResetTokenDateAndId = async (token: string, id: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.update({
      where: { token },
      data: {
        emailSentId: id,
        emailSentAt: new Date(),
      },
    });
    return passwordResetToken;
  } catch (error) {
    return error;
  }
};
