"use client"

import { useCallback, useEffect } from "react"
import { useUser } from "@/components/UserContext"
import { useGetStreamByUserId } from "@/lib/react-query/stream"
import ToggleCard from "./_components/ToggleCard"
import ChatSkeleton from "./_components/ChatSkeleton"

export default function ChatPage() {
  const { current, loading } = useUser()
  const { data, mutateAsync } = useGetStreamByUserId()

  const handleGetStreamInfo = useCallback(() => {
    if (current) {
      mutateAsync(current.$id)
    }
  }, [current, mutateAsync])

  useEffect(() => {
    handleGetStreamInfo()
  }, [handleGetStreamInfo])

  if (loading) {
    return (
      <ChatSkeleton />
    )
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={data?.isChatEnabled}
          onChange={handleGetStreamInfo}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          value={data?.isChatDelayed}
          onChange={handleGetStreamInfo}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={data?.isChatFollowersOnly}
          onChange={handleGetStreamInfo}
        />
      </div>
    </div>
  )
}