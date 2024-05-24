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

interface StreamPlayerProps {
  user: any;
  stream: any;
  isFollowing: any;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { collapsed } = useChatSidebar((state) => state);

  if (!user) {
    return <div className="p-3 text-white">Kullanıcı bulunamadı.</div>;
  }

  //eslint-disable-next-line
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity)
    return (
      <div className="p-3 text-white">
        <p>Bu yayını izlemek için erişime sahip olmalısınız.</p>
      </div>
    );

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
          "grid h-full grid-cols-1 bg-[#374151] lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-10",
          collapsed &&
            "bg-[#374151] lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-6",
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4  pb-10 md:col-span-2 lg:overflow-y-auto xl:col-span-5 2xl:col-span-7">
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
            followedByCount={5}
          />
        </div>
        <div
          className={cn("md:col-span-1 xl:col-span-3", collapsed && "hidden")}
        >
          <Chat
            viewerName={name}
            hostName={user.username}
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
