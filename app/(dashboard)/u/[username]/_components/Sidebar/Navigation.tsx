"use client"

import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  // TODO
  const user = {
    name: ""
  }

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
    <div>
      Navigation
    </div>
  )
}