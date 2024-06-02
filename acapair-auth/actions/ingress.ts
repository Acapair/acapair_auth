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
        source: TrackSource.SCREEN_SHARE,
        encodingOptions: {
          case: "preset",
          value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        },
      }),
    };
  }

  //@ts-ignore
  async function createIngressWithRetry(ingressType, options, attempt = 0) {
    try {
      const ingress = await ingressClient.createIngress(ingressType, options);
      return ingress;
    } catch (error) {
      //@ts-ignore
      if (error.status === 429 && attempt < 5) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 100),
        );
        return createIngressWithRetry(ingressType, options, attempt + 1);
      } else {
        throw error;
      }
    }
  }

  const ingress = await createIngressWithRetry(ingressType, options);

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

  revalidatePath(`/u/${decodeURI(self?.name || "")}/keys` || "/");
  return ingress;
};
