import { db } from "@/lib/db";

export const getStreamByUserId = async (userId: any) => {
  const stream = await db.stream.findUnique({
    where: { userId },
  });

  return stream;
};
