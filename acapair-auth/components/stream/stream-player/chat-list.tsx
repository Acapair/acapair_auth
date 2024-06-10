"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { ChatMessage } from "./chat-message";

interface ChatListProps {
  messages: any;
  isHidden: boolean;
}

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Sohbet devre dışı." : "Sohbete hoş geldiniz!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col-reverse p-3">
      {[...(Array.isArray(messages) ? messages : [])]
        .reverse()
        .map((m: any) => (
          <ChatMessage key={m.hash} data={m} />
        ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
};
