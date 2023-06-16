/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DefaultHeader from "@components/molecules/DefaultHeader";
import DefaultFooter from "@components/molecules/DefaultFooter";
import { Page, Box, Row, Text, Button } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type Page404PageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function Page404Page(props: Page404PageProps): JSX.Element {
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
            className={styles.row_2}
          >
            <Text className={styles.text_13} textType="Text">
              404
            </Text>
          </Row>
          <Row
            align="top"
            gutter={[30, 28]}
            justify="center"
            className={styles.row_2}
          >
            <Text className={styles.text_13} textType="Text">
              Page Not Found
            </Text>
          </Row>
          <Row
            align="top"
            gutter={[30, 30]}
            justify="center"
            className={styles.row_2}
          >
            <Text className={styles.text_13} textType="Text">
              Description about page not found
            </Text>
          </Row>
          <Row
            align="top"
            gutter={[30, 30]}
            justify="center"
            className={styles.row_2}
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
export default Page404Page;
