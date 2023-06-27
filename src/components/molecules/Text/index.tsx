/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type TextMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  Text?: string;
  move?: (Id?: number) => any;
  Id?: number;
};
function TextMolecule(props: TextMoleculeProps): JSX.Element {
  const handleBox1 = async () => {
    try {
      const { move, Id } = props;
      return move && move(Id);
    } catch (e: unknown) {}
  };
  const handleText1 = async () => {
    try {
      const { move, Id } = props;
      return move && move(Id);
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.custom_component_container} ${get(props, "className")}`}>
      <Box className={styles.box_1} onClick={handleBox1}>
        <Text className={styles.text_1} textType="Text" onClick={handleText1}>
          {get(props, "Text")}
        </Text>
      </Box>
    </Box>
  );
}
export default TextMolecule;
