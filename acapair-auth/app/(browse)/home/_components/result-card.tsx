import Link from "next/link";
import { Stream, User } from "@prisma/client";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifiedMark } from "@/components/verified-mark";

interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.name}`} className="pb-3">
      <div className="h-full w-full space-y-4 text-white">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={""}
          isLive={data.isLive}
          username={data.user.name || ""}
        />
        <div className="flex gap-x-3">
          <UserAvatar username={data.user.name || ""} imageUrl={""} />
          <div className="flex flex-col overflow-hidden text-sm">
            <p className="truncate font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <div className="flex text-gray-400">
              {data.user.name}
              <div className="pl-1 pt-1">
                <VerifiedMark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
