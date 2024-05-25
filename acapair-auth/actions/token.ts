"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";

export const createViewerToken = async (hostIdentity: string) => {
  let curUser;
  try {
    curUser = await currentUser();
  } catch (error) {
    const id = v4();
    const username = "guest" + "_" + id;
    curUser = { id, username };
  }

  //@ts-ignore
  const host = await getUserById(hostIdentity);

  if (!host) {
    return { error: "Kullanıcı bulunamadı." };
  }

  // TO DO isBanned

  const isHost = curUser?.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${curUser?.id}` : curUser?.id,
      //@ts-ignore
      name: curUser?.name,
    },
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: false,
  });

  return await Promise.resolve(token.toJwt());
};
