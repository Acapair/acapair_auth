import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

interface FollowingItemProps {
  data: any;
}

const FollowingItem = ({ data }: FollowingItemProps) => {
  console.log(data);
  return (
    <Link
      href={`/${data}`}
      className="bg-gray-850  mb-2 flex flex-row items-center justify-between  pr-2 shadow-sm hover:bg-slate-800"
    >
      <p className="flex items-center justify-between gap-1">
        <UserAvatar username={data || ""} imageUrl={""} isLive={false} />
        <span className="ml-2 text-sm">{data.toUpperCase()}</span>
      </p>
    </Link>
  );
};

export default FollowingItem;
