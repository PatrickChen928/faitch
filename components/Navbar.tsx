'use client'

import ThemeBtn from "./ThemeBtn";
import { useGetCurrentUser } from "@/lib/react-query";

export default function Navbar() {
  const { data, isLoading } = useGetCurrentUser()
  if (isLoading) return (<div>Loading...</div>)
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-dark-4 px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Faitch</h1>
      </div>
      Welcome, {data?.name}
      <ThemeBtn />
    </div>
  );
}
