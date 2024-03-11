"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"
import Hint from "@/components/Hint"
import { Button } from "@/components/ui/button"
import { useCreatorSidebar } from "@/store/use-creator-siderbar"

export default function Toggle() {
  const { isOpen, close, open } = useCreatorSidebar(state => state)

  const label = isOpen ? "Collapse" : "Expand"

  return (
    <>
      {
        !isOpen && (
          <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
            <Hint label={label} side="right" asChild>
              <Button
                className="h-auto p-2"
                onClick={open}
                variant="ghost"
              >
                <ArrowRightFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        )
      }
      {
        isOpen && (
          <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
            <p className="font-semibold text-primary">Dashboard</p>
            <Hint label={label} side="right" asChild>
              <Button
                className="h-auto p-2 ml-auto"
                onClick={close}
                variant="ghost"
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