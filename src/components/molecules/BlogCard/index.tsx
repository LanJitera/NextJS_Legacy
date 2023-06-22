/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { usePartybookingService } from "@services/partybooking";
import { Box, Text, Button, Toast } from "@jitera/jitera-web-ui-library";
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

  const handleButton1 = async () => {
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
  console.log(props);
  
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
              {get(props, "partyLocation")}
            </Text>
            <Text className={styles.text_2} textType="Text">
              {get(props, "partystarttime")}
            </Text>
          </Box>
          <Box className={styles.box_4}>
            <Box className={styles.box_5}>
              <Text className={styles.text_4} textType="Text">
                {get(props, "numberofpeople")}
              </Text>
            </Box>
            <Box className={styles.box_6}>
              <Button
                buttonType="primary"
                className={styles.button_1}
                onClick={handleButton1}
              >
                <Text className={styles.button_1_text_0} textType="Text">
                  {get(props, "label")}
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default BlogCardMolecule;
