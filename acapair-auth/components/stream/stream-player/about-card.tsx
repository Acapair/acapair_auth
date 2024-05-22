"use client";

import { VerifiedMark } from "@/components/verified-mark";

import { BioModal } from "./bio-modal";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="group flex flex-col gap-y-3 rounded-xl bg-[#21292a] p-6 lg:p-10">
        <div className="flex items-center justify-between">
          <div className="flex-row">
            <p className="pb-3 text-xl font-semibold text-white">Hakkında</p>
            <div className="flex items-center gap-x-2 text-lg  text-white">
              {hostName}
              <VerifiedMark />
            </div>
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-gray-400">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm text-gray-300">
          {bio || "Hakkında bilgisi yok."}
        </p>
      </div>
    </div>
  );
};
