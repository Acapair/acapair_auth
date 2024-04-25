"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Heart } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: any;
  user: any;
  curUser: any;
}

export const Actions = ({ isFollowing, user, curUser }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const [following, setFollowing] = useState(isFollowing);

  const onclick = () => {
    startTransition(async () => {
      if (!following) {
        await axios
          .get(
            `https://tahinli.com.tr:3434/follow/${curUser.name}/${user.name}`,
          )
          .then(() => {
            toast.success("Başarıyla takip edildi.");
            setFollowing(true);
          })
          .catch(() => {
            toast.error("Bir şeyler ters gitti.");
          });
      } else {
        await axios
          .get(
            `https://tahinli.com.tr:3434/unfollow/${curUser.name}/${user.name}`,
          )
          .then(() => {
            toast.success("Başarıyla takip bırakıldı.");
            setFollowing(false);
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
      variant="primary"
      onClick={onclick}
      className="w-56"
    >
      {following ? "Takibi bırak" : "Takip et"}
    </Button>
  );
};
