"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { InfoModal } from "./info-modal";

interface InfoCardProps {
  name: string;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard = ({
  name,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4 ">
      <div className="rounded-xl bg-[#21292a]">
        <div className="flex items-center gap-x-2.5 p-4">
          <div>
            <h2 className="text-sm font-semibold capitalize text-white lg:text-lg">
              Yayın Bilgilerinizi Düzenleyin
            </h2>
            <p className="pt-1 text-xs text-gray-400 text-muted-foreground lg:text-sm">
              Görünürlüğünüzü artırın
            </p>
          </div>
          <InfoModal initialName={name} />
        </div>
        <Separator />
        <div className="space-y-4 p-4 lg:p-6">
          <div>
            <h3 className="mb-2 text-sm text-muted-foreground text-white">
              Yayın Adı
            </h3>
            <p className="text-sm font-semibold text-gray-400">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
