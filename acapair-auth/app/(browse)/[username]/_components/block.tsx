"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Ban } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface BlockProps {
  isBanned: any;
  user: any;
  curUser: any;
}

export const Block = ({ isBanned, user, curUser }: BlockProps) => {
  const [isPending, startTransition] = useTransition();
  const [banned, setBanned] = useState(isBanned);

  const onclick = () => {
    startTransition(async () => {
      if (!banned) {
        await axios
          .get(`https://tahinli.com.tr:3434/ban/${user.name}/${curUser.name}`)
          .then(() => {
            toast.success("Kullanıcı engellendi.");
            setBanned(true);
          })
          .catch(() => {
            toast.error("Bir şeyler ters gitti.");
          });
      } else {
        await axios
          .get(`https://tahinli.com.tr:3434/unban/${user.name}/${curUser.name}`)
          .then(() => {
            toast.success("Engel kaldırıldı.");
            setBanned(false);
          })
          .catch(() => {
            toast.error("Bir şeyler ters gitti.");
          });
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      variant="danger"
      onClick={onclick}
      className="w-52"
    >
      {banned ? (
        <div className="flex items-center justify-center gap-x-2">
          <Ban className="h-5 w-5" />
          <p> Engeli Kaldır </p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-2">
          <Ban className="h-5 w-5" />
          <p> Engelle</p>
        </div>
      )}
    </Button>
  );
};
