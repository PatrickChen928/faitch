'use client'

import { Button } from "@/components/ui/button";

export default function Page() {
  const handleLogout = () => {
    fetch("/api/logout", {
      method: "POST",
    });
  }
  return (
    <div className="text-2xl cursor-pointer">
      Home

      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}
