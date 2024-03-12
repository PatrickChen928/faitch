"use client"

import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-siderbar"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  const matches = useMediaQuery('(min-width: 1024px)')
  const { isOpen, open, close } = useCreatorSidebar(state => state)

  useEffect(() => {
    if (matches) {
      open()
    } else {
      close()
    }
  }, [matches, open, close])

  return (
    <div className={cn(
      'flex-1',
      !isOpen ? "ml-[70px]" : 'ml-[70px] lg:ml-60'
    )}>
      {children}
    </div>
  )
}