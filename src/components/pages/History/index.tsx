/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import HeroSection from "@components/molecules/HeroSection";
import Image from "next/future/image";
import FooterSection from "@components/molecules/FooterSection";
import { useTranslation } from "next-i18next";
import assets from "@assets/index";
import CardItem from "@components/molecules/CardItem";
import { useAuthenticationService } from "@services/authentication";
import { usePartyService } from "@services/party";
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
  const partyService = usePartyService();
  const getApiPartiesBookingHistoryInstance =
    partyService.useGetApiPartiesBookingHistory();
  const getApiPartiesBookingHistoryResult =
    getApiPartiesBookingHistoryInstance.useQuery({
      useid: get(authenticatedDataValue, "id"),
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
              {/* dataSource={undefined}
              rowKey={useCallback(
                (item: Record<string, any>) => `${item.id}_${item.created_at}`,
                []
              )}
              grid={{ gutter: 0, xl: 12 }}
              renderItem={useCallback(
                (item: any) => (
                  <CardItem
                    nameParty={get(
                      getApiPartiesBookingHistoryResult,
                      "data.parties.nameparty"
                    )}
                    partystarttime={get(
                      getApiPartiesBookingHistoryResult,
                      "data.parties.partystarttime"
                    )}
                    partyLocation={get(
                      getApiPartiesBookingHistoryResult,
                      "data.parties.partylocation"
                    )}
                    decribe={get(
                      getApiPartiesBookingHistoryResult,
                      "data.parties.describe"
                    )}
                    img={get(
                      getApiPartiesBookingHistoryResult,
                      "data.parties.nameparty"
                    )}
                    label={"Huỷ đặt"}
                    Id={""}
                  />
                ),
                []
              )}
            /> */}
          </Box>
        </Box>
      </Box>
      <FooterSection className={styles.footersection_1} />
    </Page>
  );
}
export default HistoryPage;
