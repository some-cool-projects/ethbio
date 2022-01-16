import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthRequired({ children }) {
  const router = useRouter();
  const { isAuthenticated, isInitialized, refetchUserData } = useMoralis();

  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated) {
        refetchUserData()
        return { children };
      } else {
        router.push("/unauthorized");
      }
    }
  }, [isAuthenticated, isInitialized]);

  return "";
}
