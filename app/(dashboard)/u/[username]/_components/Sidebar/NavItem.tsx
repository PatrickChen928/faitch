"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-siderbar";

interface NavItemProps {
  label: string
  icon: any
  href: string
  isActive: boolean
}

export default function NavItem({ label, icon: Icon, href, isActive }: NavItemProps) {
  const { isOpen } = useCreatorSidebar(state => state)
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        !isOpen ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn(
            'h-4 w-4',
            isOpen ? 'mr-2' : 'mr-0'
          )} />
          {
            isOpen && (<span>{label}</span>)
          }
        </div>
      </Link>
    </Button>
  )
}