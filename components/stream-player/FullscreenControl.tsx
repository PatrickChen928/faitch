"use client"

import { Maximize, Minimize } from "lucide-react";
import Hint from "@/components/Hint";

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export default function FullscreenControl({
  isFullscreen,
  onToggle
}: FullscreenControlProps) {

  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint
        label={label}
        asChild
      >
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg bg-neutral-600 text-white hover:bg-neutral-500  dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  )
}