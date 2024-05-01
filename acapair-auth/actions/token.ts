"use server";

import { v4 } from "uuid";
import { AccessToken, AccessTokenOptions } from "livekit-server-sdk";

import { currentUser } from "@/lib/auth";
import { getUserByUsername } from "@/data/user";
import axios from "axios";

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
  const host = await getUserByUsername(curUser?.name);

  if (!host) {
    return { error: "Kullanıcı bulunamadı." };
  }

  // TO DO isBanned

  const isHost = curUser?.name === host.id;

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
    room: hostIdentity,
    roomJoin: true,
    canPublish: false,
    canPublishData: false,
  });

  return await Promise.resolve(token.toJwt());
};
