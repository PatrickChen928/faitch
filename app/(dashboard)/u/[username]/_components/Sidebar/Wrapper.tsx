"use client"

import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-siderbar"

interface WrapperProps {
  children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const { isOpen } = useCreatorSidebar(state => state)
  return (
    <aside className={cn(
      'fixed left-0 flex flex-col w-60 h-full bg-sidebar border-r z-50',
      !isOpen && 'w-[70px]'
    )}>
      {children}
    </aside>
  )
}