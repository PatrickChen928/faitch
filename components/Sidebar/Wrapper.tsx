'use client'

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/user-sidebar"

export default function Wrapper({ children }: {
  children: React.ReactNode
}) {
  const { isOpen } = useSidebar((state) => state)
  return (
    <aside className={cn(
      "fixed left-0 flex w-60 flex-col h-full bg-secondary border-r z-50",
      !isOpen && "w-[70px]"
    )}>
      {children}
    </aside>
  )
}