/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import Arrow from "@components/molecules/Arrow";
import VariantContainedSizeLargeIconLeftFalseIconRightFalse from "@components/molecules/VariantContainedSizeLargeIconLeftFalseIconRightFalse";
import assets from "@assets/index";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type FormValueMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function FormValueMolecule(props: FormValueMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.newsletter_form_section21}>
        <Image
          src={assets("1686625909972png")}
          alt={""}
          className={styles.image4}
        />
        <Box className={styles.subscribe_form21}>
          <Box className={styles.form_header8}>
            <Text className={styles.text7} textType="Text">
              subscribe to our newsletter
            </Text>
            <Text className={styles.text8} textType="Text">
              Get weekly updates
            </Text>
          </Box>
          <Box className={styles.form21}>
            <Box className={styles.form_text11}>
              <Text className={styles.text11} textType="Text">
                Fill in your details to join the party!
              </Text>
            </Box>
            <Box className={styles.form_fields20}>
              <Box className={styles.destination_name_input16}>
                <Box className={styles.input16}>
                  <Box className={styles.inactive16}>
                    <Text className={styles.text16} textType="Text">
                      Your name
                    </Text>
                    <Arrow className={styles.arrow1} />
                  </Box>
                </Box>
              </Box>
              <Box className={styles.name_input20}>
                <Box className={styles.input20}>
                  <Box className={styles.inactive20}>
                    <Text className={styles.text20} textType="Text">
                      Email address
                    </Text>
                    <Arrow className={styles.arrow2} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.button21}>
              <VariantContainedSizeLargeIconLeftFalseIconRightFalse
                className={styles.unstyled_button1}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.footer_section53} />
    </Box>
  );
}
export default FormValueMolecule;
