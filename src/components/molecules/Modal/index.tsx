/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { useTranslation } from "next-i18next";
import assets from "@assets/index";
import { usePartyService } from "@services/party";
import { Box, Text, Button, Toast } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type ModalMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  onYes?: () => any;
  onNo?: () => any;
  labelMain?: string;
  labelDec?: string;
  id?: number;
};
function ModalMolecule(props: ModalMoleculeProps): JSX.Element {
  const { t } = useTranslation("web");
  const partyService = usePartyService();

  const handleBox4 = async () => {
    try {
      const { onYes } = props;
      return onYes && onYes();
    } catch (e: unknown) {}
  };
  const handleBox0 = async () => {
    try {
      const { onNo } = props;
      return onNo && onNo();
    } catch (e: unknown) {}
  };
  const handleButton1 = async () => {
    try {
      const responseDeleteApiPartiesId = await partyService.deleteApiPartiesId.fetch({
        id: get(props, "id"),
      });
      Toast.success("Xoá thành công" || "");
    } catch (e: unknown) {
      Toast.error("Xoá thất bại " || "");
    }
  };
  return (
    <Box className={`${styles.custom_component_container} ${get(props, "className")}`}>
      <Box className={styles.box_1}>
        <Box className={styles.box_2}>
          <Text className={styles.text_1} textType="Text">
            {get(props, "onYes")}
          </Text>
          <Text className={styles.text_2} textType="Text">
            {get(props, "labelDec")}
          </Text>
        </Box>
        <Box className={styles.box_3}>
          <Box className={styles.box_4} onClick={handleBox4}>
            <Text className={styles.text_3} textType="Text">
              {t("modal.text_3")}
            </Text>
          </Box>
          <Box className={styles.box_0} onClick={handleBox0}>
            <Text className={styles.text_0} textType="Text">
              {t("modal.text_3")}
            </Text>
          </Box>
        </Box>
        <Button buttonType="primary" className={styles.button_1} onClick={handleButton1}>
          <Text className={styles.button_1_text_0} textType="Text">
            [Text]
          </Text>
        </Button>
      </Box>
      <Box className={styles.box_6}>
        <Image
          src={assets("1687671995128p9jxw3tbg90zyayptr9zwq2w7rgusvg")}
          alt={""}
          className={styles.image_1}
        />
      </Box>
    </Box>
  );
}
export default ModalMolecule;
