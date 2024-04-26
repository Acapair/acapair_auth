import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const CreatorLayout = ({ children }: CreatorLayoutProps) => {
  const curUser = currentUser();
  if (!curUser) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full bg-gray-700 pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
