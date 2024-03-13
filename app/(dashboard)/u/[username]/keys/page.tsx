"use client"

import { useEffect } from "react";
import { useGetStreamByUserId } from "@/lib/react-query/stream";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/UserContext";
import KeyCard from "./_components/KeyCard";
import UrlCard from "./_components/UrlCard";
import ConnectModal from "./_components/ConnectModal";

export default function KeysPage() {

  const { current } = useUser();

  const { data, mutateAsync } = useGetStreamByUserId()

  useEffect(() => {
    if (current) {
      mutateAsync(current.$id)
    }
  }, [current])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={data?.serverUrl} />
        <KeyCard value={data?.streamKey} />
      </div>
    </div>
  );
}