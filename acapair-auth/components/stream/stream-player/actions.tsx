"use client";

import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import { Heart, HeartCrack } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: any;
  hostIdentity: any;
}

export const Actions = ({ isFollowing, hostIdentity }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const [following, setFollowing] = useState(isFollowing);
  const curUser = useCurrentUser();

  const onclick = () => {
    startTransition(async () => {
      const user = await getUserById(hostIdentity);
      console.log(user);
      if (!following) {
        await axios
          .get(
            `https://tahinli.com.tr:3434/follow/${curUser?.name}/${user?.name}`,
          )
          .then(() => {
            toast.success("Başarıyla takip edildi.");
            setFollowing(true);
          })
          .catch(() => {
            toast.error("Bir şeyler ters gitti.");
          });
      } else {
        console.log(hostIdentity);
        const user = await getUserById(hostIdentity);
        console.log(user);
        await axios
          .get(
            `https://tahinli.com.tr:3434/unfollow/${curUser?.name}/${user?.name}`,
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
      className="w-96 md:w-52 "
    >
      {following ? (
        <div className="flex items-center justify-center gap-x-2">
          <Heart className="h-5 w-5" />
          <p> Takip Et </p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-2">
          <HeartCrack className="h-5 w-5" />
          <p> Takibi Bırak</p>
        </div>
      )}
    </Button>
  );
};
