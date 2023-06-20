/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type IcLinedeleteMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function IcLinedeleteMolecule(props: IcLinedeleteMoleculeProps): JSX.Element {
  return (
    <Box
      source={undefined}
      sourceType="upload"
      className={`${styles.page_container} ${get(props, "className")}`}
    >
      <Image
        src={assets("1683261286543png")}
        alt={""}
        className={styles.image26}
      />
    </Box>
  );
}
export default IcLinedeleteMolecule;
