"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useUnblockUser } from "@/lib/react-query/block";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
  onChange: () => void;
}

export default function UnblockButton({ userId, onChange }: UnblockButtonProps) {
  const router = useRouter()
  const { mutateAsync, isPending } = useUnblockUser()

  const onSubmit = () => {
    mutateAsync(userId).then(() => {
      toast.success("User unblocked")
      onChange()
    }).catch(() => {
      toast.error("Failed to unblock user")
    })
  }

  return (
    <Button
      variant="link"
      disabled={isPending}
      onClick={onSubmit}
      size="sm"
      className="text-primary-500 w-full"
    >
      {
        isPending ? (<Loading text="Unblock" />) : "Unblock"
      }
    </Button>
  )
}