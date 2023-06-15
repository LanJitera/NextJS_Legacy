/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type CommonButton2MoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  label?: string;
  onPress?: () => any;
};
function CommonButton2Molecule(props: CommonButton2MoleculeProps): JSX.Element {
  const handleText26 = async () => {
    try {
      const { onPress } = props;
      return onPress && onPress();
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.box_1}>
        <Text className={styles.text26} textType="Text" onClick={handleText26}>
          {get(props, "label")}
        </Text>
      </Box>
    </Box>
  );
}
export default CommonButton2Molecule;
