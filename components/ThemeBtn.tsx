'use client'

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button";

export default function ThemeBtn() {
  const { theme = 'dark', setTheme } = useTheme();
  return (
    <Button size="sm" variant="ghost" className="flex text-2xl hover:text-primary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {
        theme === "dark" ? (<Moon className="h-4 w-4" />) : (<Sun className="h-4 w-4" />)
      }
    </Button>
  );
}
