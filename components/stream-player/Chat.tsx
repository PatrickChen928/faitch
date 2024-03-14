"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export default function Chat({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly
}: ChatProps) {

  const matches = useMediaQuery("(min-width: 1024px)");
  const { variant, open } = useChatSidebar(state => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat()

  useEffect(() => {
    if (matches) {
      open()
    }
  }, [matches, open]);

  const reversedMessages = useMemo(() => messages.sort((a, b) => b.timestamp - a.timestamp), [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  }

  const onChange = (value: string) => {
    setValue(value);
  }

  return (
    <div className="flex flex-col bg-sidebar border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {
        variant === ChatVariant.CHAT && (
          <>
            <ChatForm
              onSubmit={onSubmit}
              value={value}
              onChange={onChange}
              isHidden={isHidden}
              isFollowsOnly={isChatFollowersOnly}
              isDelayed={isChatDelayed}
              isFollowing={isFollowing}
            />
          </>
        )
      }
      {
        variant === ChatVariant.COMMUNITY && (
          <>
            <p>Community mode</p>
          </>
        )
      }
    </div>
  )
}