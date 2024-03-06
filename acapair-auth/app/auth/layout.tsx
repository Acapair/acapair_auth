import Image from "next/image";
import Logo from "@/assets/pictures/navbar-logo.webp";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex justify-center bg-gradient-to-r from-slate-500 to-slate-900">
      <nav className="flex w-full shadow-lg fixed">
        <Image src={Logo} alt="logo" width={180} height={180} />
      </nav>
      <div className="flex items-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
