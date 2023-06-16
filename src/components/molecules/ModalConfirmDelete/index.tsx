/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import CommonButton2 from "@components/molecules/CommonButton2";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type ModalConfirmDeleteMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  yes?: () => any;
  No?: () => any;
};
function ModalConfirmDeleteMolecule(
  props: ModalConfirmDeleteMoleculeProps
): JSX.Element {
  const handleOnPressCommonButton1 = async () => {
    try {
      const { yes } = props;
      return yes && yes();
    } catch (e: unknown) {}
  };
  const handleOnPressCommonButton2 = async () => {
    try {
      const { No } = props;
      return No && No();
    } catch (e: unknown) {}
  };
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Text className={styles.text2} textType="Text">
        Are you sure to delete this note ?{" "}
      </Text>
      <Box className={styles.button_wrapper3}>
        <CommonButton2
          className={styles.common_button1}
          label="Yes"
          onPress={handleOnPressCommonButton1}
        />
        <CommonButton2
          className={styles.common_button2}
          label="No"
          onPress={handleOnPressCommonButton2}
        />
      </Box>
    </Box>
  );
}
export default ModalConfirmDeleteMolecule;
