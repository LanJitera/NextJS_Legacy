/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import HeroSection from "@components/molecules/HeroSection";
import FooterSection from "@components/molecules/FooterSection";
import { useTranslation } from "next-i18next";
import BlogCard from "@components/molecules/BlogCard";
import { useAuthenticationService } from "@services/authentication";
import { usePartybookingService } from "@services/partybooking";
import { Page, Box, Text, List } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type HistoryPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function HistoryPage(props: HistoryPageProps): JSX.Element {
  const { t } = useTranslation("web");
  const authenticationService = useAuthenticationService();

  const authenticatedDataValue =
    authenticationService.useAuthenticatedData("authenticatedData");
  const partybookingService = usePartybookingService();
  const getApiPartybookingsInstance =
    partybookingService.useGetApiPartybookings();
  const getApiPartybookingsResult = getApiPartybookingsInstance.useQuery({
    partybookings: { user_id: get(authenticatedDataValue, "id") },
  });

  
  return (
    <Page className={styles.page_container}>
      <HeroSection className={styles.herosection_1} />
      <Box className={styles.box_1}>
        <Box className={styles.box_2}>
          <Box className={styles.box_10}>
            <Box className={styles.box_11}>
              <Text className={styles.text_5} textType="Text">
                {t("history.text_5")}
              </Text>
            </Box>
          </Box>
          <Box className={styles.box_5}>

            <div className="ListBlogCard">
              <List
                dataSource={getApiPartybookingsResult?.data?.partybookings}
                rowKey={useCallback(
                  (item: Record<string, any>) =>
                    `${item.id}_${item.created_at}`,
                  []
                )}
                grid={{ gutter: 48, xl: 4, md: 2, xs: 1 }}
                renderItem={useCallback(
                  (item: any) => (
                    <BlogCard
                      nameParty={item.party.nameparty}
                      partystarttime={item.party.partystarttime}
                      partyLocation={item.party.partylocation}
                      decribe={item.party.partylocation}
                      img={item.party.img}
                      label={"Hủy đặt vé "}
                      IdPartyBooking={item.id}
                      numberofpeople={item.party.numberofpeople}
                      IdParty={item.party_id}
                      status={item.status}
                    />
                  ),
                  []
                )}
              />
            </div>

          </Box>
        </Box>
      </Box>
      <FooterSection className={styles.footersection_1} />
    </Page>
  );
}
export default HistoryPage;
