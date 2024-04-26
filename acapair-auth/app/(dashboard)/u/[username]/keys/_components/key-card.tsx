"use client";
import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
  value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-gray-900 p-6 text-white">
      <div className="flex items-center gap-x-10">
        <p className="shrink-0 font-semibold">Yayın Anahtarı</p>
        <div className="w-full space-y-2">
          <div className="ga-x-2 flex w-full items-center">
            <Input
              value={value || ""}
              disabled
              placeholder="Yayın Anahtarı"
              type={show ? "text" : "password"}
              className="text-black "
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            size="sm"
            variant="link"
            onClick={() => setShow(!show)}
            className="text-white"
          >
            {show ? "Gizle" : "Göster"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
