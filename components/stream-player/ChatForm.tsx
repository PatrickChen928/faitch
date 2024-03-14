"use client"


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowsOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
}

export default function ChatForm({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowsOnly,
  isFollowing,
  isDelayed
}: ChatFormProps) {

  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isFollowsOnly && !isFollowing;
  const isDisabled = isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  }

  if (isHidden) return null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
      <div className="w-full">
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            isFollowsOnly && "rounded-t-none border-t-0",
          )}
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  )
}