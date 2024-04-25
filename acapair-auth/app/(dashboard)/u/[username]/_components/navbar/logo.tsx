import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/home">
      <div className="flex items-center gap-x-4 pr-3 transition hover:opacity-75">
        <div className="shrink-0 rounded-full bg-white p-1 lg:mr-0 lg:shrink">
          <GraduationCap size={24} />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-lg font-semibold text-slate-200">Acapair</p>
          <p className="text-xs text-muted-foreground">Yayıncı Paneli</p>
        </div>
      </div>
    </Link>
  );
};
