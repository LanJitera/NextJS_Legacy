/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { usePartybookingService } from "@services/partybooking";
import { Box, Text, Button, Toast } from "@jitera/jitera-web-ui-library";
import dateFormat, { masks } from "dateformat";
import styles from "./styles.module.css";
type BlogCardMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  nameParty?: string;
  partystarttime?: string;
  partyLocation?: string;
  decribe?: string;
  img?: string;
  label?: string;
  onPress?: (Id?: number) => any;
  IdPartyBooking?: number;
  numberofpeople?: number;
  IdParty?: number;
};
function BlogCardMolecule(props: BlogCardMoleculeProps): JSX.Element {
  const partybookingService = usePartybookingService();

  
  const handleDeletePartyBooking = async () => {
    try {
      const responseDeleteApiPartybookingsId =
        await partybookingService.deleteApiPartybookingsId.fetch({
          id: get(props, "IdPartyBooking"),
        });
      Toast.success("Huỷ thành công" || "");
    } catch (e: unknown) {
      Toast.error("Huỷ thất bại" || "");
    }
  };



  
  
  return (
    <Box
      className={`${styles.custom_component_container} ${get(
        props,
        "className"
      )}`}
    >
      <Box className={styles.box_8}>
        <Image
          src={`https://picsum.photos/600/600`}
          width={258}
          height={188}
          alt={""}
          className={styles.image_1}
        />
        <Box className={styles.box_1}>
          <Box className={styles.box_3}>
            <Text className={styles.text_3} textType="Text">
              {get(props, "nameParty")}
            </Text>
          </Box>
          <Box className={styles.box_2}>
            <Text className={styles.text_1} textType="Text">
              <span className={styles.Text_partyLocation}>Địa điểm : </span>
              {get(props, "partyLocation")}
            </Text>
            <Text className={styles.text_2} textType="Text">
              {dateFormat(props?.partystarttime, "paddedShortDate") || ""}
            </Text>
          </Box>
          <Box className={styles.box_4}>
            <Box className={styles.box_5}>
              <Text className={styles.text_4} textType="Text">
              <span className={styles.Text_numberofpeople}>Số người tham gia: </span>
                 {get(props, "numberofpeople")}
              </Text>
            </Box>
            <Box className={styles.box_6}>
              <Button
                buttonType="primary"
                className={styles.button_1}
                onClick={handleDeletePartyBooking}
              >
                <Text className={styles.button_1_text_0} textType="Text">
                  {get(props, "label")}
                </Text>
              </Button>
            </Box>
          </Box>
          <Box className={styles.box_7}>
                {props?.status === "Unvalue" ? (
                  <Text className={styles.Unvalue} textType="Text">
                    Đang chờ xác nhận từ admin
                  </Text>
                ) : props?.status ===
                  "Approve" ? (
                  <Text className={styles.Approve} textType="Text">
                    Đặt đã được admin chấp nhận
                  </Text>
                ) : props?.status ===
                  "Reject" ? (
                  <Text className={styles.Reject} textType="Text">
                    Đã từ chối
                  </Text>
                ) : (
                  ""
                )}
              </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default BlogCardMolecule;
