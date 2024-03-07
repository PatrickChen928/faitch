import { account } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const session = cookies().get('auth')?.value
  if (!session) {
    return new Response('', { status: 200 })
  }
  account.deleteSession(session)
  cookies().delete('auth')
  return new Response('Success', { status: 200 })
}