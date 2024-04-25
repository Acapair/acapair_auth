import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <Navbar />
      <div className="mt-20 flex h-full pl-3">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default BrowseLayout;
