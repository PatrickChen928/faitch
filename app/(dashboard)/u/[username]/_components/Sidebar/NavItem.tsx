"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
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

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-w-[48px] min-h-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}