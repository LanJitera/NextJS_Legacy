/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
import assets from "@assets/index";
type DashboardImageWrapperMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DashboardImageWrapperMolecule(
  props: DashboardImageWrapperMoleculeProps
): JSX.Element {
  return (
    <Box className={`${styles.molecule} ${get(props, "className")}`}>
      <Box className={styles.box_2}>
        <Image
          src={assets("1686625755503logogmopng")}
          width={"167"}
          height={"38"}
          alt={""}
          className={styles.image_2}
        />
      </Box>
    </Box>
  );
}
export default DashboardImageWrapperMolecule;
