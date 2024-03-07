import { account } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const payload = await req.json()
  const session = await account.createEmailSession(payload.email, payload.password);
  cookies().set('auth', session.$id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })
  return new Response('Success', { status: 200 })
}