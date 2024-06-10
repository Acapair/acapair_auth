import { UserAvatar } from "@/components/user-avatar";
import { VerifiedIcon } from "lucide-react";
import Link from "next/link";

interface FollowingItemProps {
  data: any;
}

const FollowingItem = ({ data }: FollowingItemProps) => {
  return (
    <Link
      href={`/${data}`}
      className="mb-2 flex flex-row items-center justify-between rounded-md bg-gray-700 p-2 shadow-lg hover:bg-slate-500"
    >
      <div className="flex items-center justify-between gap-1">
        <UserAvatar username={data} isLive={false} imageUrl="" />
        <p className="ml-1 mr-1 text-sm">{data.toUpperCase()}</p>
        <VerifiedIcon className="h-4 w-4 text-blue-500" />
      </div>
    </Link>
  );
};

export default FollowingItem;
