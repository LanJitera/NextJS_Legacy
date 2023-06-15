/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardImageWrapper from "@components/molecules/DashboardImageWrapper";
import DashboardMenu from "@components/molecules/DashboardMenu";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardFooterMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DashboardFooterMolecule(props: DashboardFooterMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.molecule} ${get(props, "className")}`}>
      <Box className={styles.box_2}>
        <Box className={styles.box_4}>
          <DashboardImageWrapper className={styles.molecule_3} />
          <Box className={styles.box_6}>
            <DashboardMenu className={styles.molecule_5} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default DashboardFooterMolecule;
