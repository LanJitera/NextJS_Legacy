/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import DefaultHeaderMenu from "@components/molecules/DefaultHeaderMenu";
import DefaultHamburgerMenu from "@components/molecules/DefaultHamburgerMenu";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DefaultHeaderMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DefaultHeaderMolecule(props: DefaultHeaderMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.header_0} ${get(props, "className")}`}>
      <Box className={styles.header_box_0}>
        <Box className={styles.box_2}>
          <Box className={styles.header_box_1}>
            <Image
              src={`https://studio.jitera.app/jitera-white-logo.svg`}
              width={"100"}
              height={"0"}
              alt={""}
              className={styles.header_image_0}
            />
          </Box>
        </Box>
        <Box className={styles.box_3}>
          <DefaultHeaderMenu className={styles.header_defaultheadermenu_0} />
        </Box>
        <Box className={styles.box_4}>
          <DefaultHamburgerMenu
            className={styles.header_defaulthamburgermenu_1}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default DefaultHeaderMolecule;
