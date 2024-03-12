import Link from "next/link";
import Logo from "../../../../components/Logo";
import Search from "./Search";
import Actions from "./Actions";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-nav px-2 lg:px-4 flex justify-between items-center shadow-sm gap-4">
      <Link href="/">
        <div className="flex items-center hover:opacity-75 transition">
          <Logo hiddenTitle={true} />
        </div>
      </Link>
      <Search />
      <Actions />
    </nav>
  );
}
