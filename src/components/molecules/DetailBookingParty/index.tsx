/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { useTranslation } from "next-i18next";
import {
  Box,
  Row,
  Col,
  Text,
  Button,
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
import { useAuthenticationService } from "@services/authentication";
import { usePartybookingService } from "@services/partybooking";
import { useNavigateService } from "@services/navigate";

import dateFormat, { masks } from "dateformat";
type DetailBookingPartyMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  nameParty?: string;
  partyStartTime?: string;
  partyLocation?: string;
  numberOfPeople?: number;
  describe?: string;
  img?: string;
  partybookings?: string;
  id?: string;
  handleDeletePartyBooking?: () => void;
  handleCreatePartyBooking?: () => void;
};
function DetailBookingPartyMolecule(
  props: DetailBookingPartyMoleculeProps
): JSX.Element {
  const { handleDeletePartyBooking, handleCreatePartyBooking } = props;
  // const [PartyBooker, usePartyBooker] = useState();

  const { t } = useTranslation("web");
  // const authenticationService = useAuthenticationService();
  // const authenticatedDataValue =
  //   authenticationService.useAuthenticatedData("authenticatedData");
  const navigateService = useNavigateService();
  const partybookingService = usePartybookingService();

  const currentDate = new Date();
  const partyStartTime = new Date(props?.partystarttime);
  let isDate = false;
  if (currentDate >= partyStartTime) {
    isDate = false;
  } else {
    isDate = true;
  }

  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      {/* <Image
        src={get(props, "img")}
        width={"100%"}
        height={"100%"}
        alt={""}
        className={styles.image3}
      /> */}
      <Row
        align="top"
        gutter={[32, 32]}
        justify="start"
        className={styles.row_1}
      >
        <Col md={Number(12)} xl={Number(8)} xs={Number(24)}>
          <Box className={styles.images4}>
            <Image
              src={""}
              width={"360px"}
              height={"380px"}
              alt={""}
              className={styles.image4}
            />
          </Box>
        </Col>
        <Col md={Number(12)} xl={Number(15)} xs={Number(24)}>
          <Box className={styles.content8}>
            <Box className={styles.text8}>
              <Text className={styles.text7} textType="Text">
                {props?.nameparty}
              </Text>
              <Box className={styles.box_4}>
                <Text className={styles.text_7} textType="Text">
                  {t("detail_booking_party.text_7")}
                </Text>
                <Text className={styles.text_8} textType="Text">
                  {props?.partylocation}
                </Text>
              </Box>
              <Box className={styles.box_5}>
                <Text className={styles.text8} textType="Text">
                  {t("detail_booking_party.text8")}
                </Text>
                <Text className={styles.text_9} textType="Text">
                  {dateFormat(props?.partystarttime, "paddedShortDate") || ""}
                </Text>
              </Box>
              <Box className={styles.box_6}>
                <Text className={styles.text_5} textType="Text">
                  {t("detail_booking_party.text_5")}
                </Text>
                <Text className={styles.text_10} textType="Text">
                  {props?.numberofpeople}
                </Text>
              </Box>
              <Box className={styles.box_7}>
                <Text className={styles.text_6} textType="Text">
                  {t("detail_booking_party.text_6")}
                </Text>
                <Text className={styles.text_11} textType="Text">
                  {props?.requiredage}
                </Text>
              </Box>
            </Box>
            <Box className={styles.box_8}>
              {props.idPartyBooker === -1 && isDate ? (
                <Button
                  buttonType="primary"
                  className={styles.button_1}
                  onClick={handleCreatePartyBooking}
                >
                  <Text className={styles.button_1_text_0} textType="Text">
                    {t("detail_booking_party.button_1_text_0")}
                  </Text>
                </Button>
              ) : (
                <Button
                  buttonType="primary"
                  className={styles.button_1}
                  onClick={handleDeletePartyBooking}
                >
                  <Text className={styles.button_1_text_0} textType="Text">
                    {t("detail_booking_party.button_2_text_0")}
                  </Text>
                </Button>
              )}
            </Box>
          </Box>
        </Col>
      </Row>
    </Box>
  );
}
export default DetailBookingPartyMolecule;
