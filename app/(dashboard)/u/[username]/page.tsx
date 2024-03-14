"use client"

import StreamPlayer from "@/components/stream-player"
import { useUser } from "@/components/UserContext"

interface CreatorPageProps {
  params: {
    username: string
  }
}

export default function CreatorPage({ params }: CreatorPageProps) {
  const { current, loading } = useUser()

  if (loading) {
    return <div>Loading...</div>
  }

  if (current && current?.name !== params.username) {
    throw new Error("Unauthorized")
    // return <div>Unauthorized</div>
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