"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/main/hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "Aç" : "Kapat";

  return (
    <>
      {collapsed && (
        <div className="hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="flex w-full items-center p-2 pl-2">
          Size Özel
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="ml-auto h-auto p-2"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
