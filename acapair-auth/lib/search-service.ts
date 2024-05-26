import { db } from "@/lib/db";

export const getSearch = async (term?: string) => {
  let streams = [];

  streams = await db.stream.findMany({
    where: {
      user: {
        name: term,
      },
    },
    select: {
      user: true,
      id: true,
      name: true,
      isLive: true,
      thumbnailUrl: true,
      updatedAt: true,
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
