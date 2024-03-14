"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import Hint from "@/components/Hint";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export default function VolumeControl({
  value,
  onToggle,
  onChange
}: VolumeControlProps) {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;
  const Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;
  const label = isMuted ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  }

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg bg-neutral-600 text-white hover:bg-neutral-500  dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        value={[value]}
        onValueChange={handleChange}
        min={0}
        max={100}
        step={1}
        className="w-[8rem] cursor-pointer"
      />
    </div>
  )
}