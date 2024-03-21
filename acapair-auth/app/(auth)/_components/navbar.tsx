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
    <div className="mb-3 flex w-[680px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/home" ? "default" : "outline"}>
          <Link href="/home">Ana Sayfa</Link>
        </Button>
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
              <Link href="/admin">Kullanıcılar</Link>
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
