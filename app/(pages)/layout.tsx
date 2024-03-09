import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Page({ children }: {
  children: React.ReactNode
}) {

  return (
    <div>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>
          {children}
        </Container>
      </div>
    </div>
  );
}
