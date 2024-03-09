import Link from "next/link";
import Logo from "../Logo";
import Search from "./Search";
import Actions from "./Actions";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-light-1 dark:bg-dark-4 px-2 lg:px-4 flex justify-between items-center shadow-sm gap-4">
      <Link href="/">
        <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
          <Logo />
        </div>
      </Link>
      <Search />
      <Actions />
    </nav>
  );
}
