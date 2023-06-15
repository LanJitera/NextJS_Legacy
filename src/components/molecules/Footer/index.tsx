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
type FooterMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function FooterMolecule(props: FooterMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.footer_section53}>
        <Box className={styles.newsletter_form_section21}>
          <Image src={assets("1686626885199png")} alt={""} className={styles.image4} />
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
        <Box className={styles.footer53}>
          <Box className={styles.fickle_flight_bio33}>
            <Box className={styles.logo25}>
              <Image src={assets("1686626885275svg")} alt={""} className={styles.image25} />
            </Box>
            <Text className={styles.text26} textType="Text">
              Fickle Flight is your one-stop travel portal. We offer hassle free flight and hotel
              bookings. We also have all your flight needs in you online shop.
            </Text>
            <Box className={styles.social_icons33}>
              <Box className={styles.facebook_icon29}>
                <Image src={assets("1686626885279svg")} alt={""} className={styles.image29} />
              </Box>
              <Box className={styles.twitter_icon31}>
                <Image src={assets("1686626885281svg")} alt={""} className={styles.image31} />
              </Box>
              <Box className={styles.instagram_icon33}>
                <Image src={assets("1686626885283svg")} alt={""} className={styles.image33} />
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
export default FooterMolecule;
