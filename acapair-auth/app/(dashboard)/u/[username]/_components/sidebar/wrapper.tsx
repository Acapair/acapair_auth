"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2d2e35] bg-[#252731] text-white",
        collapsed && "w-[70px]",
      )}
    >
      {children}
    </aside>
  );
};
