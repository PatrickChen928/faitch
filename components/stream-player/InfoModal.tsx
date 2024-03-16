"use client";

import { ElementRef, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { getFileView } from "@/lib/appwrite/storage-service";
import { FileUploading } from "../file-uploading";
import { useCreateFile, useDeleteFile } from "@/lib/react-query/storage";

interface InfoModalProps {
  initialName: string;
  initialThumbnailId: string;
  initialThumbnailUrl: string;
}

export default function InfoModal({
  initialName,
  initialThumbnailId,
  initialThumbnailUrl
}: InfoModalProps) {
  const router = useRouter();

  const { mutateAsync, isPending } = useUpdateStream();
  const { mutateAsync: uploadFile, isPending: uploadLoading } = useCreateFile();

  const closeRef = useRef<ElementRef<"button">>(null);
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [thumbnailId, setThumbnailId] = useState(initialThumbnailId);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateAsync({ name, thumbnailUrl, thumbnailId }).then(() => {
      toast.success("Stream info updated");
      closeRef.current?.click();
      router.refresh();
    }).catch(() => {
      toast.error("Failed to update stream info");
    })
  }

  const onFileRemove = () => {
    setThumbnailUrl("");
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    uploadFile(file).then((res) => {
      const fileUrl = getFileView(res.$id);
      setThumbnailId(res.$id);
      setThumbnailUrl(fileUrl.href)
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
            <div className="relative rounded-xl border outline-dashed outline-muted h-[150px] overflow-hidden">
              <FileUploading loading={uploadLoading} onFileChange={onFileChange} fileUrl={thumbnailUrl} onRemove={onFileRemove} />
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