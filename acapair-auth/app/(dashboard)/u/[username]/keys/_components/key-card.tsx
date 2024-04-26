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
      <div className=" flex gap-x-8">
        <p className=" shrink-0 pt-2 font-semibold">Yayın Anahtarı</p>
        <div className="w-full flex-col items-center justify-center ">
          <div className="flex w-full items-center gap-x-2">
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
            className="pl-1 pt-4 text-sm font-medium uppercase text-white"
          >
            {show ? "Gizle" : "Göster"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
