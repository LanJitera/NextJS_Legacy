/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardNavbar from "@components/molecules/DashboardNavbar";
import DashboardSidebar from "@components/molecules/DashboardSidebar";
import { ArrayElement } from "@utils/array";
import DashboardFooter from "@components/molecules/DashboardFooter";
import { usePartybookingService } from "@services/partybooking";
import DashboardButton from "@components/molecules/DashboardButton";
import {
  Page,
  Box,
  Row,
  Col,
  Text,
  TableColumnDefinition,
  Table,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardPartybookingsPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function DashboardPartybookingsPage(props: DashboardPartybookingsPageProps): JSX.Element {
  const partybookingService = usePartybookingService();
  const getApiPartybookingsInstance = partybookingService.useGetApiPartybookings();
  const getApiPartybookingsResult = getApiPartybookingsInstance.useQuery();

  const columnsTable1 = useMemo<TableColumnDefinition<any>[]>(
    () => [
      { path: "created_at", name: "Created At", sortable: false },
      { path: "updated_at", name: "Updated At", sortable: false },
      { path: "created_at", name: "Created At", sortable: false },
      { path: "updated_at", name: "Updated At", sortable: false },
      ,
      ,
      { path: "nameparty", name: "Nameparty", sortable: false },
      { path: "partystarttime", name: "Partystarttime", sortable: false },
      { path: "partylocation", name: "Partylocation", sortable: false },
      { path: "numberofpeople", name: "Numberofpeople", sortable: false },
      { path: "isstatus", name: "Isstatus", sortable: false },
      { path: "status", name: "Status", sortable: false },
    ],
    []
  );

  const actionsTable1 = useMemo<TableColumnDefinition<any>[]>(
    () => [
      {
        name: "Delete",
        renderColumn: (props) => {
          return <DashboardButton {...props.row.original} />;
        },
      },
      {
        name: "Edit",
        renderColumn: (props) => {
          return <DashboardButton {...props.row.original} />;
        },
      },
    ],
    []
  );

  return (
    <Page className={styles.page_container}>
      <DashboardNavbar className={styles.dashboardnavbar_1} />
      <Box className={styles.dashboard_main}>
        <Box className={styles.dashboard_main_wrapper}>
          <Row align="top" gutter={[30, 30]} justify="start" className={styles.row_1}>
            <Col md={Number(24)} xl={Number(6)} xs={Number(24)}>
              <DashboardSidebar
                responsiveVisibility={["desktop"]}
                className={styles.dashboardsidebar_1}
              />
            </Col>
            <Col md={Number(24)} xl={Number(18)} xs={Number(24)}>
              <Box className={styles.dashboard_content}>
                <Box className={styles.dashboard_content_title}>
                  <Text className={styles.text_9} textType="Text">
                    Partybookings
                  </Text>
                </Box>
                <Box className={styles.dashboard_content_filter_table}>
                  <Box className={styles.box_8}>
                    <Table
                      bodyColumnStyle={{
                        backgroundColor: "#fff",
                        borderColor: "#000",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        color: "#000",
                        fontSize: "14px",
                        paddingBottom: "4px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                      data={get(getApiPartybookingsResult, "data.partybookings")}
                      footerColumnStyle={{
                        backgroundColor: "#fff",
                        borderColor: "#000",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: "bold",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        textAlign: "center",
                      }}
                      headerColumnStyle={{
                        backgroundColor: "#001529",
                        borderColor: "#000",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        paddingBottom: "8px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        paddingTop: "8px",
                        textAlign: "center",
                      }}
                      isHeaderVisible
                      actions={actionsTable1}
                      columns={columnsTable1}
                      tableStyle={{
                        backgroundColor: "#fff",
                        borderColor: "#000",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        color: "#000",
                        width: "100%",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Col>
          </Row>
        </Box>
      </Box>
      <DashboardFooter className={styles.dashboardfooter_1} />
    </Page>
  );
}
export default DashboardPartybookingsPage;
