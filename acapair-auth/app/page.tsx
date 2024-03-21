import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-orange-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-2xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Kimlik Doğrulama ve Yönetim Uygulaması
        </h1>
        <div>
          <LoginButton>
            <Button
              variant="secondary"
              size="lg"
              className="hover:bg-orange-200 ease-in-out transition-all duration-300"
            >
              Giriş Yap
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
