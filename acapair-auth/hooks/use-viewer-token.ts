import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [identity, setIdentity] = useState<string | null>(null);

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        //@ts-ignore
        setToken(viewerToken);
        //@ts-ignore
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken.name;
        const identity = decodedToken.jti;

        if (identity) setIdentity(identity);
        if (name) setName(name);
      } catch (error) {
        console.error(error);
        toast.error("Token oluşturulurken bir hata oluştu.");
      }
    };
    createToken();
  }, [hostIdentity]);

  return { token, name, identity };
};
