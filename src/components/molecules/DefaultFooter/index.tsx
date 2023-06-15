/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import DefaultFooterMenu from "@components/molecules/DefaultFooterMenu";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DefaultFooterMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DefaultFooterMolecule(props: DefaultFooterMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.footer_molecule_0} ${get(props, "className")}`}>
      <Box className={styles.footer_molecule_box_0}>
        <Box className={styles.footer_molecule_box_1}>
          <Box className={styles.footer_molecule_box_2}>
            <Image
              src={`https://studio.jitera.app/jitera-white-logo.svg`}
              width={"100"}
              height={"0"}
              alt={""}
              className={styles.footer_molecule_image_0}
            />
          </Box>
          <DefaultFooterMenu className={styles.defaultfootermenu_1} />
        </Box>
      </Box>
    </Box>
  );
}
export default DefaultFooterMolecule;
