"use client"

import Navbar from "./_components/Navbar"
import Sidebar from "./_components/Sidebar"
import Container from "./_components/Container"

interface CreatorLayoutProps {
  children: React.ReactNode
}

export default function CreatorLayout({ children }: CreatorLayoutProps) {
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