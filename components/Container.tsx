'use client'

import { useMediaQuery } from 'usehooks-ts'
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/user-sidebar"
import { useEffect } from 'react'

export default function Container(
  { children }: { children: React.ReactNode }
) {
  const matches = useMediaQuery('(min-width: 1024px)')
  const { isOpen, open, close } = useSidebar((state) => state)

  useEffect(() => {
    if (matches) {
      open()
    } else {
      close()
    }
  }, [matches])

  return (
    <div className={cn('flex-1', !isOpen ? "ml-[70px]" : 'ml-[70px] lg:ml-60')}>
      {children}
    </div>
  )
}