"use server";

import {
  IngressAudioEncodingPreset,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  IngressClient,
  IngressInput,
  type CreateIngressOptions,
  TrackSource,
  IngressAudioOptions,
  IngressVideoOptions,
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

export const createIngress = async (ingressType: IngressInput) => {
  const self = await currentUser();

  await resetIngresses(self?.id || "");

  let options: CreateIngressOptions;

  if (ingressType === IngressInput.WHIP_INPUT) {
    options = {
      name: self?.name || "Anonymous",
      roomName: self?.id,
      participantName: self?.name || "Anonymous",
      participantIdentity: self?.id,
    };
  } else {
    options = {
      name: self?.name || "Anonymous",
      roomName: self?.id,
      participantName: self?.name || "Anonymous",
      participantIdentity: self?.id,
      audio: new IngressAudioOptions({
        source: TrackSource.MICROPHONE,
        encodingOptions: {
          case: "preset",
          value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        },
      }),
      video: new IngressVideoOptions({
        source: TrackSource.CAMERA,
        encodingOptions: {
          case: "preset",
          value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        },
      }),
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
