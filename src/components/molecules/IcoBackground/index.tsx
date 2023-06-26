/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type IcoBackgroundMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function IcoBackgroundMolecule(props: IcoBackgroundMoleculeProps): JSX.Element {
  return (
    <Box
      source={undefined}
      sourceType="upload"
      className={`${styles.page_container} ${get(props, "className")}`}
    >
      <Image src={assets("1683261192898png")} alt={""} className={styles.image1} />
    </Box>
  );
}
export default IcoBackgroundMolecule;
