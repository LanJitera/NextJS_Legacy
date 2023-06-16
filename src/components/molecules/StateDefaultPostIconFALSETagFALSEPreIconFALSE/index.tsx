/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type StateDefaultPostIconFALSETagFALSEPreIconFALSEMoleculeProps =
  DefaultPageProps & {
    pageName?: string;
    className?: string;
  };
function StateDefaultPostIconFALSETagFALSEPreIconFALSEMolecule(
  props: StateDefaultPostIconFALSETagFALSEPreIconFALSEMoleculeProps
): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Text className={styles.text14} textType="Text">
        入力してください
      </Text>
    </Box>
  );
}
export default StateDefaultPostIconFALSETagFALSEPreIconFALSEMolecule;
