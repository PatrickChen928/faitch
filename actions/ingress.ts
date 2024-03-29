"use server";

import { revalidatePath } from "next/cache";
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
)

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const createIngressLiveKit = async (ingressType: IngressInput, id: string, name: string) => {
  const options: CreateIngressOptions = {
    name: name,
    roomName: id,
    participantName: name,
    participantIdentity: id
  }

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    };
  }

  const ingress = await ingressClient.createIngress(
    ingressType,
    options
  )

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress")
  }

  revalidatePath(`/u/${name}/keys`);

  return ingress
}

export const resetIngress = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity
  })

  const rooms = await roomService.listRooms([hostIdentity])

  for (const room of rooms) {
    await roomService.deleteRoom(room.name)
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId)
    }
  }
}

export const removeParticipant = async (roomName: string, participantIdentity: string) => {
  await roomService.removeParticipant(roomName, participantIdentity)
}