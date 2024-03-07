'use client'

import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme = 'dark', setTheme } = useTheme();
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-dark-4 px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <div className="text-2xl cursor-pointer" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {
          theme === "dark" ? (<span className="icon-[ph--moon-thin]" ></span>) : (<span className="icon-[ph--sun-thin]"></span>)
        }
      </div>
    </div>
  );
}
