import { db } from "@/lib/db";

// Create Stream
export const createStream = async (name: string, user: any, userId: any) => {
  try {
    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    let stream;
    if (existingUser) {
      // Connect existing user
      stream = await db.stream.create({
        data: {
          name: name,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } else {
      // Create new user and connect
      stream = await db.stream.create({
        data: {
          name: name,
          user: {
            create: {
              name: user.name,
              email: user.email,
            },
          },
        },
      });
    }

    return stream;
  } catch (error) {
    console.error(error);
    return null;
  }
};
