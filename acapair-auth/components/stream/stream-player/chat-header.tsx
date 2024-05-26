"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { ChatToggle } from "./chat-toggle";

export const ChatHeader = () => {
  return (
    <div className="relative border-b border-gray-500 p-3">
      <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggle />
      </div>
      <p className="text-priamry text-center font-semibold">Yayın Sohbeti</p>
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative hidden border-b p-3 md:block">
      <Skeleton className="absolute left-3 top-3 h-6 w-6" />
      <Skeleton className="mx-auto h-6 w-28" />
    </div>
  );
};
