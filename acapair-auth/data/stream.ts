import { db } from "@/lib/db";

// Create Stream
export const createStream = async (name: string, user: any, userId: any) => {
  try {
    const stream = await db.stream.create({
      data: {
        name,
        userId,
        user,
      },
    });
    return stream;
  } catch (error) {
    console.error(error);
    return null;
  }
};
