import { Suspense } from "react";
import Container from "@/app/(pages)/_components/Container";
import Navbar from "@/app/(pages)/_components/Navbar";
import Sidebar, { SidebarSkeleton } from "@/app/(pages)/_components/Sidebar";

export default function Page({ children }: {
  children: React.ReactNode
}) {

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>
          {children}
        </Container>
      </div>
    </>
  );
}
