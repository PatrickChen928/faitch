import { account } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  account.deleteSession('current')
  cookies().delete('auth')
  return new Response('Success', { status: 200 })
}