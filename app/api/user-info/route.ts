import { account } from "@/lib/appwrite/config";

export async function GET() {
  const res = await account.get()
  return new Response(JSON.stringify(res), { status: 200 })
}