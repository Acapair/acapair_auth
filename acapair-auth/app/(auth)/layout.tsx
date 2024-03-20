import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y items-center justify-center bg-gradient-to-r from-slate-500 to-slate-900">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
