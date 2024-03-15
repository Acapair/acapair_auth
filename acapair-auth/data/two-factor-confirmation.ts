import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return twoFactorConfirmation;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTwoFactorConfirmationById = async (id: string) => {
  try {
    await db.twoFactorConfirmation.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
