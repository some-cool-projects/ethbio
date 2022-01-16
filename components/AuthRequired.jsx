import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

const AuthRequired = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized, refetchUserData, user } =
    useMoralis();

  useEffect(() => {
    refetchUserData();
    if (user == null) {
      console.log("hmm");
      redirect();
    }
    if (isAuthenticated) {
      return { children };
    } else {
      redirect();
    }

    const redirect = () => {
      router.push("/unauthorized");
      return null;
    };
  }, [isAuthenticated, isInitialized, children]);

  return "";
};

export default AuthRequired;
