"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeBtn from "@/components/ThemeBtn"
import { useUser } from "@/components/UserContext"
import { Skeleton } from "./ui/skeleton"

export default function User() {
  const router = useRouter()
  const { current: data, loading, logout } = useUser()

  if (loading) return <UserSkeleton />

  if (!data) {
    return (
      <Button size="sm" variant="secondary" className="text-muted-foreground hover:text-primary" onClick={() => router.push('/sign-in')}>Login</Button>
    )
  }


  const handleMenuSelect = async (item: string) => {
    if (item === "logout") {
      await logout()
      router.push("/")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-0">
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src={data.imageUrl} alt={data.name} />
          <AvatarFallback>{data.name[0] + data.name[data.name.length - 1]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-x-2">
            {data.name} <ThemeBtn />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => handleMenuSelect('profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleMenuSelect('logout')}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const UserSkeleton = () => {
  return (
    <Skeleton className="h-9 w-9 rounded-full" />
  )
}