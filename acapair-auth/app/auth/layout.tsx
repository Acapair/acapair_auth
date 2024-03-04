const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-900">
      {children}
    </div>
  );
};

export default AuthLayout;
