"use client";

import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import NavItem, { NavItemSkeleton } from "./nav-item";

const Navigation = () => {
  const pathname = usePathname();
  const user = useCurrentUser();
  const routes = [
    {
      label: "Yayın",
      href: `/u/${user?.name}`,
      icon: Fullscreen,
    },
    {
      label: "Anahtarlar",
      href: `/u/${user?.name}/keys`,
      icon: KeyRound,
    },
    {
      label: "Sohbet",
      href: `/u/${user?.name}/chat`,
      icon: MessageSquare,
    },
  ];

  if (!user?.name) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => {
          return <NavItemSkeleton key={i} />;
        })}
      </ul>
    );
  }

  return (
    <div className="mt-5 space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          href={route.href}
          label={route.label}
          icon={route.icon}
          isActive={pathname === route.href}
        />
      ))}
    </div>
  );
};

export default Navigation;
