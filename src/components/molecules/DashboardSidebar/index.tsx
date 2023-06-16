/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardMenuItem from "@components/molecules/DashboardMenuItem";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardSidebarMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DashboardSidebarMolecule(
  props: DashboardSidebarMoleculeProps
): JSX.Element {
  const handleOnClickDashboardmenuitem1 = async () => {
    // TODO: handle logic
  };
  return (
    <Box className={`${styles.molecule} ${get(props, "className")}`}>
      <Box className={styles.box_2}>
        <DashboardMenuItem
          className={styles.dashboardmenuitem_1}
          label="Admins"
          onClick={handleOnClickDashboardmenuitem1}
        />
      </Box>
    </Box>
  );
}
export default DashboardSidebarMolecule;
