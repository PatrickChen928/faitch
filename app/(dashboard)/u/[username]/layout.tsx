"use client"

import { useGetSelfByUserName } from "@/lib/react-query/user"
import { useRouter } from "next/navigation"
import Navbar from "./_components/Navbar"
import Sidebar from "./_components/Sidebar"

interface CreatorLayoutProps {
  params: {
    username: string
  },
  children: React.ReactNode
}

export default function CreatorLayout({ params, children }: CreatorLayoutProps) {
  const router = useRouter()
  const { data, isLoading } = useGetSelfByUserName(params.username)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    router.push('/')
    return null
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  )
}