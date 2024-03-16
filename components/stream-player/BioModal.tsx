"use client";

import { ElementRef, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Hint from "@/components/Hint";
import { useUpdateUserBio } from "@/lib/react-query/user";
import { toast } from "sonner";
import Loading from "../Loading";
import { useUser } from "../UserContext";

interface BioModalProps {
  initialValue: string;
}

export default function BioModal({ initialValue }: BioModalProps) {

  const { refresh } = useUser()

  const [value, setValue] = useState(initialValue || "");
  const closeRef = useRef<ElementRef<"button">>(null);

  const { mutateAsync, isPending } = useUpdateUserBio();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(value).then(() => {
      toast.success("Bio updated successfully");
      refresh();
      closeRef.current?.click();
    }).catch(() => {
      toast.error("Failed to update bio");
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button variant="ghost" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={isPending} >
              {
                isPending ? (<Loading text="Save" />) : "Save"
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}