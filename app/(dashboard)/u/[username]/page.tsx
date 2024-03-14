"use client"

import StreamPlayer from "@/components/stream-player"
import { useUser } from "@/components/UserContext"
import { useRouter } from "next/navigation"

interface CreatorPageProps {
  params: {
    username: string
  }
}

export default function CreatorPage({ params }: CreatorPageProps) {
  const router = useRouter()
  const { current, loading } = useUser()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!current || current.name !== params.username) {
    router.push("/sign-in")
    return null
  }

  return (
    <div className="w-full">
      <StreamPlayer
        user={current!}
        stream={current?.stream}
        isFollowing
      />
    </div>
  )
}