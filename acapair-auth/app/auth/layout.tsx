import NavbarApp from "@/components/auth/navbar-app";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acapair",
  description: "Educational Stream Platform Login Page",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full justify-center  bg-[#242731]">
      <NavbarApp />
      <div className="flex items-center pt-3">{children}</div>
    </div>
  );
};

export default AuthLayout;
