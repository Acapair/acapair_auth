import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";
import { UserButton } from "@/components/auth/user-button";

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        className="text-muted-foreground hover:text-primary"
        size="sm"
        variant="ghost"
        asChild
      >
        <Link href={"/home"}>
          <HomeIcon className="mr-2 h-5 w-5" />
          Ana Sayfa
        </Link>
      </Button>
      <UserButton />
    </div>
  );
};
