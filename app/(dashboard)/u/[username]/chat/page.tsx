"use client"

import { useCallback, useEffect } from "react"
import { useUser } from "@/components/UserContext"
import { useGetStreamByUserId } from "@/lib/react-query/stream"
import ToggleCard from "./_components/ToggleCard"

export default function ChatPage() {

  const { current } = useUser()
  const { data, mutateAsync } = useGetStreamByUserId()

  const handleGetStreamInfo = useCallback(() => {
    if (current) {
      mutateAsync(current.$id)
    }
  }, [current, mutateAsync])

  useEffect(() => {
    handleGetStreamInfo()
  }, [handleGetStreamInfo])

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
      </div>
    </div>
  )
}