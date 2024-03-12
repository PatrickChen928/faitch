'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"
import { useSidebar } from "@/store/user-sidebar"
import { Button } from "@/components/ui/button"
import Hint from "@/components/Hint"
import { Skeleton } from "@/components/ui/skeleton"

export default function Toggle() {
  const { isOpen, open, close } = useSidebar((state) => state)


  const label = !isOpen ? "Expand" : "Collapse"
  return (
    <>
      {
        !isOpen && (
          <div
            className="hidden lg:flex w-full items-center justify-center pt-4 mb-4"
          >
            <Hint label={label} asChild side="right">
              <Button onClick={open} className="h-auto p-2" variant="ghost"><ArrowRightFromLine className="h-4 w-4" /></Button>
            </Hint>
          </div>
        )
      }
      {
        isOpen && (
          <div className="p-3 pl-6 mb-2 flex items-center w-full">
            <p className="font-semibold text-primary">For you</p>
            <Hint label={label} side="right" asChild>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto h-auto p-2"
                onClick={close}
              >
                <ArrowLeftFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        )
      }
    </>
  )
}

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
      <Skeleton className="w-[100px] h-6" />
      <Skeleton className="ml-auto w-6 h-6" />
    </div>
  )
}