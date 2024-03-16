"use client"

import { useRouter } from "next/navigation"
import StreamPlayer from "@/components/stream-player"
import { useUser } from "@/components/UserContext"
import Loading from "./loading"

interface CreatorPageProps {
  params: {
    username: string
  }
}

export default function CreatorPage({ params }: CreatorPageProps) {
  const router = useRouter()
  const { current, loading } = useUser()

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!current || current.name !== decodeURIComponent(params.username)) {
    router.push("/sign-in")
    return null
  }

  return (
    <div className="w-full bg-background">
      <StreamPlayer
        user={current!}
        stream={current?.stream}
        isFollowing
      />
    </div>
  )
}