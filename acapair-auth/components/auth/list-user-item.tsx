"use client";
import Link from "next/link";
import { CardContent } from "../ui/card";

const ListUserItem = ({ user }: any) => {
  // On the client side

  return (
    <Link href={`/admin/users/${user.id}`}>
      <CardContent>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg hover:shadow-xl hover:bg-slate-300 ease-in-out duration-200 hover:border-slate-300">
          <p className="text-sm font-medium">E-posta</p>
          <p className="truncate text-xs max-w-[200px] font-mono  p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
      </CardContent>
    </Link>
  );
};

export default ListUserItem;
