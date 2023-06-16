/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type ArrowMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function ArrowMolecule(props: ArrowMoleculeProps): JSX.Element {
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.arrow_drop_down329}>
        <Image
          src={assets("1686621807430svg")}
          alt={""}
          className={styles.image329}
        />
      </Box>
    </Box>
  );
}
export default ArrowMolecule;
