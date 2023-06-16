/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardButton from "@components/molecules/DashboardButton";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardDialogMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  label?: string;
  onCancel?: () => any;
  onConfirm?: () => any;
};
function DashboardDialogMolecule(
  props: DashboardDialogMoleculeProps
): JSX.Element {
  const handleOnClickButton1 = async () => {
    try {
      const { onCancel } = props;
      return onCancel && onCancel();
    } catch (e: unknown) {}
  };
  const handleOnClickButton2 = async () => {
    try {
      const { onConfirm } = props;
      return onConfirm && onConfirm();
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.molecule_container} ${get(props, "className")}`}>
      <Box className={styles.dialog_wrapper}>
        <Box className={styles.dialog_content}>
          <Text className={styles.text_1} textType="Text">
            {get(props, "label")}
          </Text>
        </Box>
        <Box className={styles.dialog_footer}>
          <Box className={styles.box_4}>
            <DashboardButton
              className={styles.button_1}
              label="Cancel"
              onClick={handleOnClickButton1}
            />
            <DashboardButton
              className={styles.button_2}
              label="Confirm"
              onClick={handleOnClickButton2}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default DashboardDialogMolecule;
