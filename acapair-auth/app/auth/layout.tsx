import Image from "next/image";
import Logo from "@/assets/pictures/navbar-logo.webp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acapair",
  description: "Educational Stream Platform Login Page",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex justify-center bg-gradient-to-r from-slate-500 to-slate-900">
      <nav className="flex w-full shadow-lg fixed">
        <Image
          src={Logo}
          alt="acapair-logo"
          width={180}
          height={180}
          sizes="180px"
          decoding="async"
          data-nimg="1"
          style={{ color: "transparent" }}
          priority
        />
      </nav>
      <div className="flex items-center pt-3">{children}</div>
    </div>
  );
};

export default AuthLayout;
