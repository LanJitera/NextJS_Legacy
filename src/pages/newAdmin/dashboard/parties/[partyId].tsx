import type { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { initServerInfo } from "@utils/serverSide";
import { dehydrate } from "react-query";
import DashboardPartiesDetail from "@components/pages/DashboardPartiesDetail";
export async function getServerSideProps(context: NextPageContext) {
  const { locale = "en", query } = context;
  const options: {
    props?: Record<string, unknown>;
    redirect?: Record<string, unknown>;
  } = {};
  const { session, queryClient } = await initServerInfo(context);
  if (!session?.user?.accessToken) {
    return {
      redirect: {
        destination: "newAdmin/loginAdmin",
        permanent: false,
      },
    };
  }

  return {
    ...options,
    props: {
      query,
      session,
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: "" || "",
        description: "" || "",
      },
      ...(await serverSideTranslations(locale, ["common", "web"])),
      ...(options.props || {}),
    },
  };
}
export default DashboardPartiesDetail;
