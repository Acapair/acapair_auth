import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";

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
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
};

export default CreatorLayout;
