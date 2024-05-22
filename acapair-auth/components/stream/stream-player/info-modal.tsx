"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateStream } from "@/actions/stream";

interface InfoModalProps {
  initialName: string;
}

export const InfoModal = ({ initialName }: InfoModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto text-white">
          Güncelle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yayın Bilgilerini Güncelle</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-1">
          <div className="space-y-2">
            <Label className="font-semibold">Yayın Adı</Label>
            <Input
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={name}
            />
          </div>
          <div className="flex justify-between pt-3">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="danger">
                İptal Et
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant="primary" type="submit">
              Kaydet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
