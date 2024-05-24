"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

import { Stream } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { createStream } from "@/data/stream";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const user = await currentUser();
    const stream = await db.stream.findUnique({
      where: {
        userId: user?.id,
      },
    });

    if (!stream) {
      throw new Error("Yayın bulunamadı.");
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFolloweOnly: values.isChatFolloweOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const updatedStream = await db.stream.update({
      where: {
        id: stream?.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${user?.name}/chat`);
    revalidatePath(`/u/${user?.name}`);
    revalidatePath(`/${user?.name}/chat`);

    return updateStream;
  } catch (error) {
    console.log(error);
  }
};

//@ts-ignore
export const createStreamAction = async (name: string, user: any, id: any) => {
  try {
    //@ts-ignore
    const newStream = await createStream(name, user, id);
    revalidatePath(`/u/${user?.name}/keys`);
    return newStream;
  } catch (error) {
    console.log(error);
  }
};
