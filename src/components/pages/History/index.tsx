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
          </Box>
          <Box className={styles.box_5}>
            <Box className={styles.box_6}>
              <Image
                src={assets("1686621806872png")}
                alt={""}
                className={styles.image_1}
              />
              <Box className={styles.box_7}>
                <Box className={styles.box_8}>
                  <Box className={styles.box_9}>
                    <Text className={styles.text_2} textType="Text">
                      Palawan
                    </Text>
                    <Text className={styles.text_3} textType="Text">
                      4D3N
                    </Text>
                  </Box>
                  <Text className={styles.text_4} textType="Text">
                    $789
                  </Text>
                </Box>
              </Box>
            </Box>
            <List
              dataSource={undefined}
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
            />
          </Box>
        </Box>
      </Box>
      <FooterSection className={styles.footersection_1} />
    </Page>
  );
}
export default HistoryPage;
