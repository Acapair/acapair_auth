"use client";
import { useSidebar } from "@/store/use-sidebar";

import FollowingItem from "./following-item";

interface FollowingProps {
  data: any;
}

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;

  console.log(">", data);
  return (
    <div>
      {showLabel && (
        <div>
          <span className="pl-2 pr-2 text-xs font-bold">Takip edilenler</span>

          <div className="mb-2 w-full flex-col items-center pl-2 pr-2 pt-3">
            {data.map((item: any) => (
              <FollowingItem key={item} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Following;
