import Link from "next/link";
import { Clapperboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { UserButton } from "@/components/auth/user-button";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="ml-4 mr-5 flex items-center justify-end gap-x-5 lg:ml-0">
      {!!user && (
        <div className="flex items-center justify-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-slate-900"
            asChild
          >
            <Link href={`/u/${user.name}`}>
              <Clapperboard className="h-5 w-5 lg:mr-3" />
              <span className="text-md hidden lg:block">Yayıncı Paneli</span>
            </Link>
          </Button>
          <div className="pl-1">
            <UserButton />
          </div>
        </div>
      )}
    </div>
  );
};
