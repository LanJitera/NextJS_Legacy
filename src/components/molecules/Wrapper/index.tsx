/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type WrapperMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function WrapperMolecule(props: WrapperMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.title27}>
        <Text className={styles.text27} textType="Text">
          Label
        </Text>
      </Box>
      <Box className={styles.input29}>
        <Text className={styles.text29} textType="Text">
          Placeholder
        </Text>
      </Box>
    </Box>
  );
}
export default WrapperMolecule;
