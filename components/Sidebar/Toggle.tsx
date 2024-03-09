'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"
import { useSidebar } from "@/store/user-sidebar"
import { Button } from "../ui/button"
import Hint from "../Hint"

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