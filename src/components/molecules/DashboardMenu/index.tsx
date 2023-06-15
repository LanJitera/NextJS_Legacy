/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardMenuItem from "@components/molecules/DashboardMenuItem";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardMenuMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DashboardMenuMolecule(props: DashboardMenuMoleculeProps): JSX.Element {
  const handleOnClickDashboardnavbarmenuitem1 = async () => {
    // TODO: handle logic
  };
  return (
    <Box className={`${styles.molecule} ${get(props, "className")}`}>
      <Box className={styles.box_2}>
        <DashboardMenuItem
          className={styles.dashboardnavbarmenuitem_1}
          label="Admins"
          onClick={handleOnClickDashboardnavbarmenuitem1}
        />
      </Box>
    </Box>
  );
}
export default DashboardMenuMolecule;
