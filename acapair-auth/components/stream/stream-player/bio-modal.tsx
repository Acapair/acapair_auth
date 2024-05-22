"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("Güncellendi!");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Bir hata oluştu. Lütfen tekrar deneyin."));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto  text-white">
          Güncelle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hakkında Bilgisini Güncelle</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="hakkında bilgisi"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="danger">
                İptal Et
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              Kaydet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
