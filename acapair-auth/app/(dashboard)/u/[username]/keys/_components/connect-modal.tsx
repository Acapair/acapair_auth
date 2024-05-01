"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { useState, useTransition, useRef, ElementRef } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Bağlantı oluşturuldu");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Bir hata oluştu"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Yayın Bağlantısı Oluştur</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bağlantı yarat</DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Yayın Seç" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Uyarı!</AlertTitle>
          <AlertDescription>
            Bu işlem aktif olan tüm yayınları sıfırlayacaktır.
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">İptal et</Button>
          </DialogClose>
          <Button onClick={onSubmit} variant="primary" disabled={isPending}>
            Bağlantı üret
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
