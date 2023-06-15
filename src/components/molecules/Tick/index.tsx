/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { Box } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type TickMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  tick?: () => any;
  not_tick?: () => any;
};
function TickMolecule(props: TickMoleculeProps): JSX.Element {
  const handleBox1 = async () => {
    try {
      const { tick } = props;
      return tick && tick();
    } catch (e: unknown) {}
  };
  const handleBox0 = async () => {
    try {
      const { not_tick } = props;
      return not_tick && not_tick();
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.custom_component_container} ${get(props, "className")}`}>
      <Box className={styles.box_1} onClick={handleBox1}>
        <Image src={assets("1683537343659filepng")} alt={""} className={styles.image_2} />
      </Box>
      <Box className={styles.box_0} onClick={handleBox0}>
        <Image src={assets("1683554521045removepng")} alt={""} className={styles.image_3} />
      </Box>
    </Box>
  );
}
export default TickMolecule;
