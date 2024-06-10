"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./video";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Chat } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";
import { followerCount } from "@/lib/follower";
import { useEffect, useState } from "react";

interface StreamPlayerProps {
  user: any;
  stream: any;
  isFollowing: any;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { collapsed } = useChatSidebar((state) => state);
  const { token, name, identity } = useViewerToken(user.id);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchFollowerCount = async () => {
      const count = await followerCount(user.name);
      setCount(count);
    };

    fetchFollowerCount(); // Initial fetch
    const interval = setInterval(fetchFollowerCount, 10000);

    return () => clearInterval(interval);
  }, [user.name]);

  if (!user) {
    return <div className="p-3 text-white">Kullanıcı bulunamadı.</div>;
  }

  if (!token || !name || !identity) {
    return (
      <div className="p-3 text-white">
        <p>Bu yayını izlemek için erişime sahip olmalısınız.</p>
      </div>
    );
  }

  return (
    <>
      {collapsed && (
        <div className="fixed right-2 top-[100px] z-50 hidden lg:block">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-4">
          <Video hostName={user.name} hostIdentity={user.id} />
          <Header
            hostName={user.name}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream?.name || "İsim Yok"}
          />
          <InfoCard
            name={stream?.name || "İsim Yok"}
            hostIdentity={user.id}
            viewerIdentity={identity}
          />
          <AboutCard
            hostName={user.name}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={count}
          />
        </div>
        <div className={cn("col-span-1 2xl:col-span-2", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.name}
            hostIdentity={user.id}
            isFollowing={true}
            isChatEnabled={stream?.isChatEnabled}
            isChatDelayed={stream?.isChatDelayed}
            isChatFollowersOnly={stream?.isChatFolloweOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;
