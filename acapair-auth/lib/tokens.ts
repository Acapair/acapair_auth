import { getVertificationTokenByEmail } from "@/data/vertification-token";
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
