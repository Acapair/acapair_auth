import { $Enums } from "@prisma/client";
import { currentUser } from "./auth";
import { db } from "./db";

export const getStreams = async () => {
  const curUsr = await currentUser();
  let streams: {
    user: {
      id: string;
      name: string | null;
      image: string | null;
      email: string;
      emailVerified: Date | null;
      password: string | null;
      bio: string | null;
      isTwoFactorEnabled: boolean;
      role: $Enums.UserRole;
      createdAt: Date;
      updatedAt: Date;
    };
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
  }[] = [];

  if (curUsr) {
    streams = await db.stream.findMany({
      where: {
        NOT: {
          userId: curUsr.id,
        },
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
