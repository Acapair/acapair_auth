import { db } from "@/lib/db";

export const updatePassword = async (userId: string, password: string) => {
  await db.user.update({
    where: { id: userId },
    data: { password: password },
  });
};

export const deletePasswordResetToken = async (tokenId: string) => {
  await db.passwordResetToken.delete({
    where: { id: tokenId },
  });
};
