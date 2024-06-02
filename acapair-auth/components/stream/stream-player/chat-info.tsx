import { useMemo } from "react";
import { Info } from "lucide-react";

import { Hint } from "@/components/hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Sadece takipçiler sohbet edebilir";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Mesajlar 3 saniye gecikmeli gönderilir";
    }

    if (isDelayed && isFollowersOnly) {
      return "Sadece takipçiler sohbet edebilir ve mesajlar 3 saniye gecikmeli gönderilir";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Takipçi modu açık";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Yavaş mod açık";
    }

    if (isDelayed && isFollowersOnly) {
      return "Takipçi ve yavaş mod açık";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-x-2 rounded-t-md border border-gray-500 bg-white/5 p-2 text-muted-foreground">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
