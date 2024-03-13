import { getVertificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generateVertificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getVertificationTokenByEmail(email);
  if (existingToken) {
    await db.vertificationToken.delete({
      // @ts-ignore
      where: { id: existingToken.id },
    });
  }

  const vertificationToken = await db.vertificationToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });
  return vertificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      // @ts-ignore
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });
  return passwordResetToken;
};
