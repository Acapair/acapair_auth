"use client";
import { useSidebar } from "@/store/use-sidebar";

import FollowingItem from "./following-item";
import Link from "next/link";
import stringToColor from "string-to-color";

interface FollowingProps {
  data: any;
}

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;
  const color = stringToColor(data || "");

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
              className="mb-1 w-full rounded-lg p-3 text-center text-sm shadow-lg"
            >
              <Link href={`/${item}`} style={{ color }}>
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
