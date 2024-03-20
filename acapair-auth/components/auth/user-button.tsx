"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback className="bg-slate-600 text-muted-foreground hover:bg-primary">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30" align="end">
        <DropdownMenuItem className="bg-slate-700 text-white">
          {user?.name}
        </DropdownMenuItem>
        <DropdownMenuItem className="pt-3">
          <Link href="/settings">
            <div className="flex justify-center items-center ">
              <Settings className="h-4 w-4 mr-2" />
              <p>Ayarlar</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="pt-3">
            <ExitIcon className="h-4 w-4 mr-2" />
            Çıkış Yap
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
