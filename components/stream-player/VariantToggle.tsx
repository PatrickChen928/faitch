"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users } from "lucide-react";

export default function VariantToggle() {
  const { variant, onChangeVariant } = useChatSidebar(state => state);

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;
  const label = isChat ? "Community" : "Go back to chat";

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  }

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  )
}