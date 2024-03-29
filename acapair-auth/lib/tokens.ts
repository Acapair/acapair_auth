import { getVertificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import crypto from "crypto";
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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiresAt = new Date(new Date().getTime() + 600_000); // 10 minutes

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return twoFactorToken;
};
