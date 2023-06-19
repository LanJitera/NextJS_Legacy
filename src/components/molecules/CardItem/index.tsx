/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { Box, Text, Button } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type CardItemMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  nameParty?: string;
  partystarttime?: string;
  partyLocation?: string;
  decribe?: string;
  img?: string;
  label?: string;
  onPress?: (Id?: number) => any;
  Id?: number;
};
function CardItemMolecule(props: CardItemMoleculeProps): JSX.Element {
  console.log(props);
  const handleText29 = async () => {
    try {
      const { onPress, Id } = props;
      return onPress && onPress(Id);
    } catch (e: unknown) {}
  };
  return (
    <Box
      className={`${styles.custom_component_container} ${get(
        props,
        "className"
      )}`}
    >
      <Box className={styles.box_3}>
        <Image
          src={get(props, "img")}
          width={"288"}
          height={"242"}
          alt={""}
          className={styles.image_1}
        />
        <Box className={styles.box_4}>
          <Box className={styles.box_5}>
            <Box className={styles.box_6}>
              <Text className={styles.text_1} textType="Text">
                {get(props, "nameParty")}
              </Text>
              <Text className={styles.text_2} textType="Text">
                {get(props, "partystarttime")}
              </Text>
            </Box>
            <Text className={styles.text_3} textType="Text">
              {get(props, "decribe")}
            </Text>
          </Box>
          <Button buttonType="primary" className={styles.button_0}>
            <Text
              className={styles.text_29}
              textType="Text"
              onClick={handleText29}
            >
              {get(props, "label")}
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default CardItemMolecule;
