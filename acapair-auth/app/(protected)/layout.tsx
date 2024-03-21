import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y items-center justify-center bg-gradient-to-r from-orange-500 to-orange-800">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
