"use client";

import Image from "next/image";
import { Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "../Loading";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Hint from "../Hint";

interface FileUploadingProps {
  fileUrl?: string;
  loading?: boolean;
  alt?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export const FileUploading = ({
  fileUrl,
  loading,
  alt,
  onFileChange,
  onRemove
}: FileUploadingProps) => {
  return (
    <>
      {
        fileUrl ? (
          <div className="relative w-full h-full">
            <Image
              fill
              src={fileUrl}
              alt={alt || "thumbnail"}
              objectFit="contain"
            />
            <div className="absolute top-2 right-2 z-[10]">
              <Button className="h-auto w-auto p-1.5" onClick={onRemove}>
                <Hint label="Remove" side="left" asChild>
                  <Trash className="h-4 w-4" />
                </Hint>
              </Button>
            </div>
          </div>
        ) : (
          <div className={cn(
            "relative flex items-center justify-center h-full group",
            !loading && "hover:bg-accent/10"
          )}>
            {
              loading ? <Loading /> : (
                <>
                  <Input onChange={onFileChange} type="file" className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-1" />
                  <Plus className="h-10 w-10 text-primary-600 group-hover:text-primary-600/90"
                  />
                </>
              )
            }
          </div>
        )
      }
    </>
  )
}