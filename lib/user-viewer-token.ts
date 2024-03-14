import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";
import { useUser } from "@/components/UserContext";

export const useViewerToken = (hostIdentity: string) => {
  const { current, loading } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [identity, setIdentity] = useState<string | null>(null);

  const createToken = async () => {
    try {
      const token = await createViewerToken(hostIdentity, current ? { id: current.$id, name: current.name } : undefined);
      setToken(token);

      const decodeToken = jwtDecode<JwtPayload & { name?: string }>(token);
      const name = decodeToken?.name;
      const identity = decodeToken?.jti;

      if (identity) {
        setIdentity(identity);
      }

      if (name) {
        setName(name);
      }
    } catch (error) {
      toast.error("Failed to get token");
    }
  }

  useEffect(() => {
    if (loading) {
      return;
    }
    createToken()
  }, [hostIdentity, current, loading])

  return {
    token,
    name,
    identity,
  }
}