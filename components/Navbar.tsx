import ThemeBtn from "./ThemeBtn";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-dark-4 px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <ThemeBtn />
    </div>
  );
}
