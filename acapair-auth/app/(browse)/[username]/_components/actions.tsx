"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: any;
  user: any;
  curUser: any;
}

export const Actions = ({ isFollowing, user, curUser }: ActionsProps) => {
  // unfollow
  /*
  const following = await axios.get(
    `https://tahinli.com.tr:3434/unfollow/${curUser.name}/${user.name}`,
  );s
 */

  const [isPending, startTransition] = useTransition();
  isFollowing = true;

  const onclick = () => {
    startTransition(async () => {
      if (!isFollowing) {
        await axios
          .get(
            `https://tahinli.com.tr:3434/follow/${curUser.name}/${user.name}`,
          )
          .then(() => {
            toast.success("Başarıyla takip edildi.");
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
          })
          .catch(() => {
            toast.error("Bir şeyler ters gitti.");
          });
      }
    });
    redirect(`/${user.name}`);
  };

  return (
    <Button disabled={isPending} variant="primary" onClick={onclick}>
      {isFollowing ? "Takibi bırak" : "Takip et"}
    </Button>
  );
};
