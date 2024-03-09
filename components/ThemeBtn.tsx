'use client'

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeBtn() {
  const { theme = 'dark', setTheme } = useTheme();
  return (
    <Button size="sm" variant="ghost" className="flex text-2xl text-muted-foreground hover:text-primary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {
        theme === "dark" ? (<span className="icon-[ph--moon-thin]" ></span>) : (<span className="icon-[ph--sun-thin]"></span>)
      }
    </Button>
  );
}
