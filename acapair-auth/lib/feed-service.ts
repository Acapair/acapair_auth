import { db } from "./db";
export const getStreams = async () => {
  let streams = [];

  streams = await db.stream.findMany({
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

  return streams;
};
