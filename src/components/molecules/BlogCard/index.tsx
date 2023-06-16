/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { useTranslation } from "next-i18next";
import { Box, Text, Button } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type BlogCardMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function BlogCardMolecule(props: BlogCardMoleculeProps): JSX.Element {
  const { t } = useTranslation("web");

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
          width={"258px"}
          height={"188px"}
          alt={""}
          className={styles.image_1}
        />
        <Box className={styles.box_1}>
          <Box className={styles.box_3}>
            <Text className={styles.text_3} textType="Text">
              {t("blog_card.text_3")}
            </Text>
          </Box>
          <Box className={styles.box_2}>
            <Text className={styles.text_1} textType="Text">
              {t("blog_card.text_1")}
            </Text>
            <Text className={styles.text_2} textType="Text">
              {t("blog_card.text_2")}
            </Text>
          </Box>
          <Box className={styles.box_4}>
            <Box className={styles.box_5}>
              <Text className={styles.text_4} textType="Text">
                {t("blog_card.text_4")}
              </Text>
              <Image
                src={`https://picsum.photos/600/600`}
                width={"27px"}
                height={"27px"}
                alt={""}
                className={styles.image_2}
              />
            </Box>
            <Box className={styles.box_6}>
              <Button buttonType="primary" className={styles.button_1}>
                <Text className={styles.button_1_text_0} textType="Text">
                  {t("blog_card.button_1_text_0")}
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
