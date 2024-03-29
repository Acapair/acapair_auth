import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="gap-y flex h-full w-full flex-col items-center justify-center bg-[#242731]">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
