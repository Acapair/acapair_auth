import Navbar from "@/components/auth/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acapair",
  description: "Educational Stream Platform Login Page",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex justify-center bg-gradient-to-r from-slate-500 to-slate-900">
      <Navbar />
      <div className="flex items-center pt-3">{children}</div>
    </div>
  );
};

export default AuthLayout;
