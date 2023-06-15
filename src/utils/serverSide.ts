import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { QueryClient } from "react-query";
import memoryStorage from "@utils/memoryStorage";

export async function initServerInfo(context: NextPageContext) {
  const queryClient = new QueryClient();
  const session = await getSession(context);
  memoryStorage.setAuthenticationInfo(session);
  return { queryClient, session };
}
