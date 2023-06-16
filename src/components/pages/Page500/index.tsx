/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DefaultHeader from "@components/molecules/DefaultHeader";
import DefaultFooter from "@components/molecules/DefaultFooter";
import { Page, Box, Row, Text, Button } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type Page500PageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function Page500Page(props: Page500PageProps): JSX.Element {
  return (
    <Page className={styles.page_container}>
      <DefaultHeader className={styles.defaultheader_1} />
      <Box
        responsiveVisibility={["desktop", "tablet", "mobile"]}
        className={styles.box_0}
      >
        <Box className={styles.box_0}>
          <Row
            align="top"
            gutter={[30, 30]}
            justify="center"
            className={styles.row_0}
          >
            <Text className={styles.text_0} textType="Text">
              500
            </Text>
          </Row>
          <Row
            align="top"
            gutter={[30, 28]}
            justify="center"
            className={styles.row_0}
          >
            <Text className={styles.text_0} textType="Text">
              System Error
            </Text>
          </Row>
          <Row
            align="top"
            gutter={[30, 30]}
            justify="center"
            className={styles.row_0}
          >
            <Text className={styles.text_0} textType="Text">
              Description about system error
            </Text>
          </Row>
          <Row
            align="top"
            gutter={[30, 30]}
            justify="center"
            className={styles.row_0}
          >
            <Button buttonType="primary" className={styles.button_0}>
              Redirect to home
            </Button>
          </Row>
        </Box>
      </Box>
      <DefaultFooter className={styles.defaultfooter_1} />
    </Page>
  );
}
export default Page500Page;
