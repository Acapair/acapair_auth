"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  return (
    <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[680px] shadow-sm mb-3">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Ayarlar</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Bilgilerim</Link>
        </Button>
        {currentUser?.role === "ADMIN" ? (
          <>
            <Button
              asChild
              variant={pathname === "/admin" ? "default" : "outline"}
            >
              <Link href="/admin">Kullanıcı Listesi</Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/admin/search" ? "default" : "outline"}
            >
              <Link href="/admin/search">Kullanıcı Ara</Link>
            </Button>
          </>
        ) : (
          ""
        )}
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
