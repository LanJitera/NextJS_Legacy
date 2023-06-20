/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardImageWrapper from "@components/molecules/DashboardImageWrapper";
import DashboardMenu from "@components/molecules/DashboardMenu";
import DashboardSidebar from "@components/molecules/DashboardSidebar";
import { Box, Icon, Drawer } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardNavbarMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DashboardNavbarMolecule(
  props: DashboardNavbarMoleculeProps
): JSX.Element {
  const handleBox6 = async () => {
    try {
      Drawer.show(<DashboardSidebar />, { position: "right" });
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.molecule} ${get(props, "className")}`}>
      <Box className={styles.box_2}>
        <DashboardImageWrapper className={styles.molecule_3} />
        <Box
          responsiveVisibility={["desktop", "tablet", "mobile"]}
          className={styles.box_4}
        >
          <DashboardMenu
            responsiveVisibility={["desktop"]}
            className={styles.molecule_5}
          />
          <Box
            responsiveVisibility={["tablet", "mobile"]}
            className={styles.box_6}
            onClick={handleBox6}
          >
            <Icon
              color="#ffffff"
              iconName="MdOutlineMenu"
              size={Number(24)}
              className={styles.icon_2}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default DashboardNavbarMolecule;
