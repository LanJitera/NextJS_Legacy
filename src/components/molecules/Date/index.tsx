/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DateMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DateMolecule(props: DateMoleculeProps): JSX.Element {
  return (
    <Box
      source={undefined}
      sourceType="upload"
      className={`${styles.page_container} ${get(props, "className")}`}
    >
      <Image
        src={assets("1686621807428svg")}
        alt={""}
        className={styles.image327}
      />
    </Box>
  );
}
export default DateMolecule;
