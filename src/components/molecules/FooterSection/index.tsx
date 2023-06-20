/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type FooterSectionMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function FooterSectionMolecule(props: FooterSectionMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.footer_section53}>
        <Box className={styles.footer53}>
          <Box className={styles.fickle_flight_bio33}>
            <Box className={styles.logo25}>
              <Image
                src={assets("1686630477484logogmopng")}
                alt={""}
                className={styles.image25}
              />
            </Box>
            <Box className={styles.social_icons33}>
              <Box className={styles.facebook_icon29}>
                <Image
                  src={assets("1686625910040svg")}
                  alt={""}
                  className={styles.image29}
                />
              </Box>
              <Box className={styles.twitter_icon31}>
                <Image
                  src={assets("1686625910042svg")}
                  alt={""}
                  className={styles.image31}
                />
              </Box>
              <Box className={styles.instagram_icon33}>
                <Image
                  src={assets("1686625910044svg")}
                  alt={""}
                  className={styles.image33}
                />
              </Box>
            </Box>
          </Box>
          <Box className={styles.seperator34} />
          <Box className={styles.footer_links53}>
            <Box className={styles.company41}>
              <Text className={styles.text37} textType="Text">
                About Us
              </Text>
              <Text className={styles.text38} textType="Text">
                Company
              </Text>
              <Text className={styles.text39} textType="Text">
                News
              </Text>
              <Text className={styles.text40} textType="Text">
                Careers
              </Text>
              <Text className={styles.text41} textType="Text">
                How we work
              </Text>
            </Box>
            <Box className={styles.support47}>
              <Text className={styles.text43} textType="Text">
                Account
              </Text>
              <Text className={styles.text44} textType="Text">
                Support
              </Text>
              <Text className={styles.text45} textType="Text">
                Support Center
              </Text>
              <Text className={styles.text46} textType="Text">
                FAQ
              </Text>
              <Text className={styles.text47} textType="Text">
                Accessibility
              </Text>
            </Box>
            <Box className={styles.more53}>
              <Text className={styles.text49} textType="Text">
                Covid Advisory
              </Text>
              <Text className={styles.text50} textType="Text">
                More
              </Text>
              <Text className={styles.text51} textType="Text">
                Airline Fees
              </Text>
              <Text className={styles.text52} textType="Text">
                Tips
              </Text>
              <Text className={styles.text53} textType="Text">
                Quarantine Rules
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default FooterSectionMolecule;
