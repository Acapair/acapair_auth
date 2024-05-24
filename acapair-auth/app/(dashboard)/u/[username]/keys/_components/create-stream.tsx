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
  console.log(user);
  console.log(id);
  console.log(name);
  return (
    <div>
      <Button
        onClick={() =>
          //@ts-ignore
          startTransition(() => createStreamAction(name, user, id))
        }
      >
        {isPending ? "Yayın oluşturuluyor..." : "Yayın Oluştur"}
      </Button>
    </div>
  );
};

export default CreateStream;
