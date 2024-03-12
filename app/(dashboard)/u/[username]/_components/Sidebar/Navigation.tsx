"use client"

import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import NavItem, { NavItemSkeleton } from "./NavItem"
import { useUser } from "@/components/UserContext"

export default function Navigation() {
  const pathname = usePathname()
  const { current: user } = useUser()

  if (!user) return (
    <ul className="space-y-2">
      {
        Array.from({ length: 4 }).map((_, i) => (
          <NavItemSkeleton key={i} />
        ))
      }
    </ul>
  )

  const routes = [
    {
      label: "Stream",
      href: `/u/${user.name}`,
      icon: Fullscreen
    },
    {
      label: "Keys",
      href: `/u/${user.name}/keys`,
      icon: KeyRound
    },
    {
      label: "Chat",
      href: `/u/${user.name}/chat`,
      icon: MessageSquare
    },
    {
      label: "Community",
      href: `/u/${user.name}/community`,
      icon: Users
    }
  ]
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {
        routes.map((route) => (
          <NavItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathname === route.href}
          />
        ))
      }
    </ul>
  )
}