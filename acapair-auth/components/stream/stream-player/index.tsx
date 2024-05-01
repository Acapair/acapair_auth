"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./video";

interface StreamPlayerProps {
  user: any;
  stream: any;
}

const StreamPlayer = ({ user, stream }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  if (!token || !name || !identity)
    return (
      <div className="text-white">
        <p>Bu yayını izleyemezsin.</p>
      </div>
    );

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6"
      >
        <div className="hidden-scrollbar col-span-1 space-y-6 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.name} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;
