"use client";

import { createStreamAction } from "@/actions/stream";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface CreateStreamProps {
  name: string;
  user: any;
  id: any;
}

const CreateStream = ({ name, user, id }: CreateStreamProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mx-auto max-w-lg rounded-lg border border-gray-300  p-5 text-center">
      <h1 className="mb-5 text-2xl">Kanal Oluştur</h1>
      <p className="mb-5 text-lg">
        Yeni bir kanal oluşturmak için aşağıdaki butona tıklayın. Kanalınız kısa
        süre içinde oluşturulacaktır.
      </p>
      <Button
        onClick={() =>
          //@ts-ignore
          startTransition(() => createStreamAction(name, user, id))
        }
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-lg text-white"
      >
        {isPending ? "Kanal oluşturuluyor..." : "Kanal Oluştur"}
      </Button>
    </div>
  );
};

export default CreateStream;
