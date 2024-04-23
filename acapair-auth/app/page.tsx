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
    <main className="flex h-full flex-col items-center justify-center bg-[#242731]">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}
        >
          🎓 Acapair
        </h1>
        <p className="text-lg text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <div>
          <LoginButton>
            <Button
              variant="secondary"
              size="lg"
              className="hover:bg-fuchsia-200"
            >
              Oturum Aç
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
