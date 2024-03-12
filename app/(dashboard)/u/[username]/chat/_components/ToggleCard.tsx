"use client"

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useUpdateStream } from "@/lib/react-query/stream";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
  onChange: () => void;
}

export default function ToggleCard({
  label,
  value = false,
  field,
  onChange
}: ToggleCardProps) {

  const { mutateAsync, isPending } = useUpdateStream()

  const handleChatChange = () => {
    mutateAsync({
      [field]: !value
    }).then(() => {
      toast.success("Chat settings updated")
      onChange()
    }).catch(() => {
      toast.error("Failed to update chat settings")
    })
  }

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">
          {label}
        </p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={handleChatChange}
            disabled={isPending}
          >
            {
              value ? "On" : "Off"
            }
          </Switch>
        </div>
      </div>
    </div>
  )
}

export const ToggleCardSkeleton = () => {
  return (
    <Skeleton className="rounded-xl p-10 w-full" />
  )
}