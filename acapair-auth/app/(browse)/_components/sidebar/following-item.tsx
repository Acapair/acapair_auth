import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";

interface FollowingItemProps {
  data: any;
}

const FollowingItem = ({ data }: FollowingItemProps) => {
  return (
    <Link
      href={`/${data}`}
      className="bg-gray-850 mb-2 flex flex-row items-center justify-between shadow-lg hover:bg-slate-800"
    >
      <div className="flex items-center justify-between gap-1">
        <UserAvatar username={data} isLive={false} imageUrl="" />
        <p className="ml-2 text-sm">{data.toUpperCase()}</p>
      </div>
    </Link>
  );
};

export default FollowingItem;
