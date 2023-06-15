/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type FillTrueLeadingIconFalseTrailingIconTrueMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function FillTrueLeadingIconFalseTrailingIconTrueMolecule(
  props: FillTrueLeadingIconFalseTrailingIconTrueMoleculeProps
): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Text className={styles.text10} textType="Text">
        Button
      </Text>
      <Box className={styles.icons_arrow13}>
        <Image src={assets("1686668131148png")} alt={""} className={styles.image12} />
        <Image src={assets("1686668131166svg")} alt={""} className={styles.image13} />
      </Box>
    </Box>
  );
}
export default FillTrueLeadingIconFalseTrailingIconTrueMolecule;
