/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { useTranslation } from "next-i18next";
import assets from "@assets/index";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import { Modal as NewModal } from "../../../../libraries/jitera-web-ui-library/src/components/atoms/Modal/Modal.component";
import styles from "./styles.module.css";
type ModalMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  new_prop_ntse?: string;
};
function ModalMolecule(props: ModalMoleculeProps): JSX.Element {
  const { t } = useTranslation("web");

  const handleBox4 = async () => {
    // TODO: handle logic
  };
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
          <Box className={styles.box_4} onClick={handleBox4}>
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
