import Link from "next/link";
import Logo from "../../../../components/Logo";
import Search from "./Search";
import Actions from "./Actions";
import GithubLink from "@/components/GithubLink";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-nav px-2 lg:px-4 flex justify-between items-center shadow-sm gap-4">
      <div className="flex-shrink-0 flex items-center gap-x-2">
        <Link href="/" className="flex-shrink-0">
          <div className="flex-shrink-0 flex items-center hover:opacity-75 transition">
            <Logo hiddenTitle={true} />
          </div>
        </Link>
        <GithubLink />
      </div>
      <Search />
      <Actions />
    </nav>
  );
}
