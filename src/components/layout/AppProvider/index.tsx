import { useEffect } from "react";
import { useSession } from "next-auth/react";
import memoryStorage from "@utils/memoryStorage";
import { REFRESH_TOKEN_REJECTED_ERROR } from "@constants/error";
import { logout } from "@services/authentication/requests";

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const session = useSession();
  useEffect(() => {
    memoryStorage.setAuthenticationInfo(session.data);
    if (session.data?.user?.error === REFRESH_TOKEN_REJECTED_ERROR) {
      logout();
    }
  }, [session]);
  return children;
};

export default AppProvider;
