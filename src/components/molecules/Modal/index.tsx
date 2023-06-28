/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { useTranslation } from "next-i18next";
import assets from "@assets/index";
import { usePartyService } from "@services/party";
import { Box, Text, Button, Toast } from "@jitera/jitera-web-ui-library";
import { Modal as NewModal } from "../../../../libraries/jitera-web-ui-library/src/components/atoms/Modal/Modal.component";
import styles from "./styles.module.css";
import { usePartybookingService } from "@services/partybooking";
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
  const {onYes} = props

  const { t } = useTranslation("web");

console.log(props);


  return (
    <Box
      className={`${styles.custom_component_container} ${get(
        props,
        "className"
      )}`}
    >
      <Box className={styles.box_1}>
        <Box className={styles.box_2}>
          <Text className={styles.text_1} textType="Text">
            {props.labelMain}
          </Text>
          <Text className={styles.text_2} textType="Text">
            {props.label}
          </Text>
        </Box>
        <Box className={styles.box_3}>
          <Box className={styles.box_4} onClick={onYes}>
            <Text className={styles.text_3} textType="Text">
              {props.labelButtonYes}
            </Text>
          </Box>
          <Box className={styles.box_0}>
            <Text
              className={styles.text_0}
              textType="Text"
              onClick={() => {
                NewModal.hide();
              }}
            >
              {props.labaelButtonCancel}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        className={styles.box_6}
        onClick={() => {
          NewModal.hide();
        }}
      >
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


