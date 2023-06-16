/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardButtonMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  label?: string;
  onClick?: () => any;
};
function DashboardButtonMolecule(
  props: DashboardButtonMoleculeProps
): JSX.Element {
  const handleBox1 = async () => {
    try {
      const { onClick } = props;
      return onClick && onClick();
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.molecule_container} ${get(props, "className")}`}>
      <Box className={styles.box_1} onClick={handleBox1}>
        <Text className={styles.text_1} textType="Text">
          {get(props, "label")}
        </Text>
      </Box>
    </Box>
  );
}
export default DashboardButtonMolecule;
