import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { RiLiveLine } from "react-icons/ri";

interface FollowingItemProps {
  data: any;
}

const FollowingItem = ({ data }: FollowingItemProps) => {
  return (
    <Link
      href={`/${data}`}
      className="bg-gray-850 mb-2 flex flex-row items-center justify-between rounded-lg border p-3 pr-2 shadow-lg hover:bg-slate-800"
    >
      <p className="flex items-center justify-center text-sm">
        <FaUser className="mr-2 inline text-gray-600" />
        {data.toLowerCase()}
        <RiLiveLine className="ml-2 inline text-green-500" />
      </p>
    </Link>
  );
};

export default FollowingItem;