"use server";

import {
  IngressAudioEncodingPreset,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  IngressClient,
  IngressInput,
  type CreateIngressOptions,
  TrackSource,
} from "livekit-server-sdk";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

// creates a new ingress and sends the data to our mysql db
export const createIngress = async (ingressType: IngressInput) => {
  const self = await currentUser();

  await resetIngresses(self?.id || "");

  const options: CreateIngressOptions = {
    name: self?.name || "Anonymous",
    roomName: self?.id,
    participantName: self?.name || "Anonymous",
    participantIdentity: self?.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.enableTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Ingress creation failed");
  }

  await db.stream.update({
    where: { userId: self?.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self?.name}/keys` || "/");
  return ingress;
};
