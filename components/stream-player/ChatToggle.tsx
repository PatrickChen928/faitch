"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";

export default function ChatToggle() {
  const { isOpen, open, close } = useChatSidebar(state => state);

  const Icon = isOpen ? ArrowRightFromLine : ArrowLeftFromLine;
  const label = isOpen ? "Collapse" : "Expand";

  const onToggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }

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