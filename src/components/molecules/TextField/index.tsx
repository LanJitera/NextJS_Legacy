/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import TextFieldTitle from "@components/molecules/TextFieldTitle";
import StateDefaultPostIconFALSETagFALSEPreIconFALSE from "@components/molecules/StateDefaultPostIconFALSETagFALSEPreIconFALSE";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type TextFieldMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function TextFieldMolecule(props: TextFieldMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.wrapper2}>
        <TextFieldTitle className={styles.title1} />
        <StateDefaultPostIconFALSETagFALSEPreIconFALSE className={styles.input1} />
      </Box>
    </Box>
  );
}
export default TextFieldMolecule;
