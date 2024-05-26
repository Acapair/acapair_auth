"use client";

import { format } from "date-fns";

import { stringToColor } from "@/lib/utils";

interface ChatMessageProps {
  data: any;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.sender || "");

  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
      <p className="text-sm text-white/40">
        {new Date(data.time_received).toLocaleTimeString("tr-TR")}
      </p>
      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="whitespace-nowrap text-sm font-semibold">
          <span className="truncate" style={{ color: color }}>
            {data.sender}
          </span>
          :
        </p>
        <p className="break-all text-sm">{data.data}</p>
      </div>
    </div>
  );
};
