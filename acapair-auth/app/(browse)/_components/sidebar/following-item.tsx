import Link from "next/link";

interface FollowingItemProps {
  data: any;
}

const FollowingItem = ({ data }: FollowingItemProps) => {
  console.log(data);
  return (
    <Link
      href={`/${data}`}
      className="bg-gray-850 mb-2 flex flex-row items-center justify-between shadow-lg hover:bg-slate-800"
    >
      <p className="flex items-center justify-between gap-1">
        <span className="ml-2 text-sm">{data.toUpperCase()}</span>
      </p>
    </Link>
  );
};

export default FollowingItem;
