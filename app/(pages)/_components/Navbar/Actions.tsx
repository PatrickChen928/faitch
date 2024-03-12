'use client'

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Clapperboard } from "lucide-react"
import { useGetCurrentUser } from "@/lib/react-query/user"
import { Button } from "../../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeBtn from "../../../../components/ThemeBtn"
import { logout } from "@/lib/appwrite/user-service"

export default function Actions() {
  const router = useRouter()
  const { data, isLoading } = useGetCurrentUser()

  if (isLoading) return null

  const handleMenuSelect = (item: string) => {
    if (item === "logout") {
      logout()
      router.push("/")
    }
  }
  return (
    <div className="flex items-center justify-center gap-x-2 ml-2 lg:ml-0">
      {
        !data && (
          <Button size="sm" variant="secondary" className="text-muted-foreground hover:text-primary" onClick={() => router.push('/sign-in')}>Login</Button>
        )
      }
      {
        !!data && (
          <div className="flex items-center gap-x-4">
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
              <Link href={`/u/${data.name}`}>
                <Clapperboard className="w-5 h-5 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            </Button>
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
          </div>
        )
      }
    </div>
  )
}