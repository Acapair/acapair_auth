"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: any;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ href, icon: Icon, label, isActive }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "h-12 w-full",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-gray-700 text-white",
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export default NavItem;

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
