/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, HamburgerMenu, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DefaultHamburgerMenuMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DefaultHamburgerMenuMolecule(props: DefaultHamburgerMenuMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.hamburger_menu_molecule_0} ${get(props, "className")}`}>
      <Box className={styles.box_0}>
        <HamburgerMenu
          buttonProps={{ buttonType: "primary" }}
          buttonStyle={{ backgroundColor: "transparent" }}
          drawerProps={{ closable: true, placement: "right", width: 256 }}
          drawerTitle={"[Title]"}
          iconProps={{ iconName: "MdMenu" }}
        >
          <Box className={styles.box_1}>
            <Text
              href={"https://jitera.com"}
              className={styles.hamburger_menu_molecule_home}
              textType="Link"
            >
              Home
            </Text>
            <Text
              href={"https://jitera.com"}
              className={styles.hamburger_menu_molecule_news}
              textType="Link"
            >
              News
            </Text>
            <Text
              href={"https://jitera.com"}
              className={styles.hamburger_menu_molecule_about_us_0}
              textType="Link"
            >
              About Us
            </Text>
            <Text
              href={"https://jitera.com"}
              className={styles.hamburger_menu_molecule_contact_0}
              textType="Link"
            >
              Contact
            </Text>
          </Box>
        </HamburgerMenu>
      </Box>
    </Box>
  );
}
export default DefaultHamburgerMenuMolecule;
