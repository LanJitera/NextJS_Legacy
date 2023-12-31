/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardMenuItem from "@components/molecules/DashboardMenuItem";
import { useNavigateService } from "@services/navigate";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardSidebarMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DashboardSidebarMolecule(props: DashboardSidebarMoleculeProps): JSX.Element {
  const navigateService = useNavigateService();

  const handleOnClickDashboardmenuitem1 = async () => {
    try {
      navigateService.navigate("/newAdmin/dashboard/parties");
    } catch (e: unknown) {}
  };
  const handleOnClickDashboardmenuitem2 = async () => {
    try {
      navigateService.navigate("/newAdmin/dashboard/users");
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.molecule} ${get(props, "className")}`}>
      <Box className={styles.box_2}>
        <DashboardMenuItem
          className={styles.dashboardmenuitem_1}
          label="List party"
          onClick={handleOnClickDashboardmenuitem1}
        />
        <DashboardMenuItem
          className={styles.dashboardmenuitem_2}
          label="List user"
          onClick={handleOnClickDashboardmenuitem2}
        />
      </Box>
    </Box>
  );
}
export default DashboardSidebarMolecule;
