"use client";

import { getUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
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
      const user = await getUser(hostIdentity).then((res) => res?.name);
      if (!following) {
        await axios
          .patch(
            //@ts-ignore
            `https://tahinli.com.tr:3434/follow/${decodeURI(curUser?.name || "")}/${decodeURI(user || "")}`,
          )
          .then(() => {
            toast.success("Başarıyla takip edildi.");
            setFollowing(true);
          })
          .catch(() => {
            toast.error("Bir şeyler ters gitti.");
          });
      } else {
        const user = await getUser(hostIdentity).then((res) => res?.name);

        await axios
          .patch(
            //@ts-ignore
            `https://tahinli.com.tr:3434/unfollow/${decodeURI(curUser?.name || "")}/${decodeURI(user || "")}`,
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
      {!following ? (
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
