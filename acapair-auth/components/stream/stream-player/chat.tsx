"use client";

import { useEffect, useMemo, useState } from "react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import {
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";
import { ChatCommunity } from "./chat-community";
import { getMessage, sendMessage } from "@/actions/chat";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (matches) onExpand();
  }, [matches, onExpand]);

  useEffect(() => {
    if (!isHidden) {
      const fetchMessages = async () => {
        try {
          const data = await getMessage(hostIdentity);
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      const intervalId = setInterval(fetchMessages, 1000);
      fetchMessages();
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [hostIdentity, isHidden]);

  const onSubmit = () => {
    sendMessage(hostIdentity, viewerName, value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col border-b border-l border-gray-500 bg-[#21292a] pt-0 text-white">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={messages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};
