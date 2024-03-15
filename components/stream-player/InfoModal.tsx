"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { useUpdateStream } from "@/lib/react-query/stream";
import { useCreateFile } from "@/lib/react-query/storage";
import { getFileView } from "@/lib/appwrite/storage-service";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string;
}

export default function InfoModal({
  initialName,
  initialThumbnailUrl
}: InfoModalProps) {
  const { mutateAsync: uploadFile } = useCreateFile();

  const closeRef = useRef<ElementRef<"button">>(null);
  const { mutateAsync, isPending } = useUpdateStream();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateAsync({ name }).then(() => {
      toast.success("Stream info updated");
      closeRef.current?.click();
      setName(name);
    }).catch(() => {
      toast.error("Failed to update stream info");
    })
  }


  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    mutateAsync(file).then((res) => {
      console.log(res, "success");

      console.log(getFileView(res.$id))
    }).catch((e) => {
      console.log("error", e);
    });

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              value={name}
              onChange={onChange}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="rounded-xl border outline-dashed outline-muted">

            </div>
          </div>
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              variant="primary"
            >
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