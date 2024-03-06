"use client"
import { useTheme } from "next-themes";

export default function Home() {
  const { theme = 'dark', setTheme } = useTheme();
  return (
    <div className="text-2xl cursor-pointer" onClick={() => setTheme(theme === "light" ? "dark": "light")}>
      {
        theme === "dark" ? 
          (<span className="icon-[ph--moon-thin]" ></span>) :
          (<span className="icon-[ph--sun-thin]"></span>)}
    </div>
  );
}
