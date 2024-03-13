import { NextRequest } from "next/server";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { appwriteConfig, database } from "@/lib/appwrite";
import { Query } from "appwrite";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new Response("No authorization header", { status: 400 });
  }

  const event = receiver.receive(body, authorization);

  if (event.event === "ingress_ended") {
    const ingressId = event.ingressInfo?.ingressId;
    if (!ingressId) {
      return new Response("No ingressId", { status: 400 });
    }
    const streams = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.streamCollectionId,
      [
        Query.equal("ingressId", ingressId)
      ]
    );

    if (streams.documents.length === 0) {
      return new Response("No streams found", { status: 404 });
    }

    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.streamCollectionId,
      streams.documents[0].$id,
      {
        isLive: false
      }
    )
  } else if (event.event === "ingress_started") {
    const ingressId = event.ingressInfo?.ingressId;
    if (!ingressId) {
      return new Response("No ingressId", { status: 400 });
    }
    const streams = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.streamCollectionId,
      [
        Query.equal("ingressId", ingressId)
      ]
    );

    if (streams.documents.length === 0) {
      return new Response("No streams found", { status: 404 });
    }

    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.streamCollectionId,
      streams.documents[0].$id,
      {
        isLive: true
      }
    )
  }
}