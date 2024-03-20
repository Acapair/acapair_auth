import Link from "next/link";
import { Clapperboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { UserButton } from "@/components/auth/user-button";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!!user && (
        <div className="flex items-center gap-x-4 pr-5 justify-center">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.id}`}>
              <Clapperboard className="h-5 w-5 lg:mr-3" />
              <span className="hidden lg:block">Kontrol Paneli</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  );
};
