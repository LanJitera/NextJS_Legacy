/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DefaultFooterMenuMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DefaultFooterMenuMolecule(props: DefaultFooterMenuMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.footer_menu_molecule_0} ${get(props, "className")}`}>
      <Box
        responsiveVisibility={["desktop", "tablet", "mobile"]}
        className={styles.footer_menu_molecule_box_0}
      >
        <Text
          href={"https://jitera.com"}
          className={styles.footer_menu_molecule_home_0}
          textType="Link"
        >
          Home
        </Text>
        <Text
          href={"https://jitera.com"}
          className={styles.footer_menu_molecule_news_0}
          textType="Link"
        >
          News
        </Text>
        <Text
          href={"https://jitera.com"}
          className={styles.footer_menu_molecule_contact_us_0}
          textType="Link"
        >
          Contact Us
        </Text>
        <Text
          href={"https://jitera.com"}
          className={styles.footer_menu_molecule_about_0}
          textType="Link"
        >
          About
        </Text>
      </Box>
    </Box>
  );
}
export default DefaultFooterMenuMolecule;
