"use client";
import { useSidebar } from "@/store/use-sidebar";

import FollowingItem from "./following-item";
import Link from "next/link";

interface FollowingProps {
  data: any;
}

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div>
          <div className="mb-2 w-full flex-col items-center pl-2 pr-2 pt-1">
            {data.map((item: any) => (
              <FollowingItem key={item} data={item} />
            ))}
          </div>
        </div>
      )}
      {collapsed && (
        <div className="w-full flex-col items-center justify-center p-3">
          {data.map((item: any) => (
            <div
              key={item}
              className="mb-1 w-full rounded-full border border-gray-100 bg-gray-800 p-3 text-center text-xs hover:bg-gray-600"
            >
              <Link href={`/${item}`}>
                {item[0].toUpperCase() + item[1].toUpperCase()}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Following;
