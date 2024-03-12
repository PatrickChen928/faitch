"use client"

import { useRouter } from "next/navigation"
import { useGetSelfByUserName } from "@/lib/react-query/user"
import Navbar from "./_components/Navbar"
import Sidebar from "./_components/Sidebar"
import Container from "./_components/Container"

interface CreatorLayoutProps {
  params: {
    username: string
  },
  children: React.ReactNode
}

export default function CreatorLayout({ params, children }: CreatorLayoutProps) {
  // const router = useRouter()
  // const { data } = useGetSelfByUserName(params.username)

  // if (!data) {
  //   router.push('/')
  //   return null
  // }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>
          {children}
        </Container>
      </div>
    </>
  )
}