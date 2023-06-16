/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardMenuItemMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  label?: string;
  onClick?: () => any;
};
function DashboardMenuItemMolecule(
  props: DashboardMenuItemMoleculeProps
): JSX.Element {
  const handleBox2 = async () => {
    try {
      const { onClick } = props;
      return onClick && onClick();
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.molecule} ${get(props, "className")}`}>
      <Box className={styles.box_2} onClick={handleBox2}>
        <Text className={styles.text_2} textType="Text">
          {get(props, "label")}
        </Text>
      </Box>
    </Box>
  );
}
export default DashboardMenuItemMolecule;
