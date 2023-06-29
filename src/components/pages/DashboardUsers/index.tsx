/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardNavbar from "@components/molecules/DashboardNavbar";
import DashboardSidebar from "@components/molecules/DashboardSidebar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrayElement } from "@utils/array";
import DashboardFooter from "@components/molecules/DashboardFooter";
import { useTranslation } from "next-i18next";
import { useUserService } from "@services/user";
import { useNavigateService } from "@services/navigate";
import Modal from "@components/molecules/Modal";
import DashboardButton from "@components/molecules/DashboardButton";
import {
  Page,
  Box,
  Row,
  Col,
  Text,
  Button,
  Input,
  TableColumnDefinition,
  Table,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardUsersPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_userName: string;
}
function DashboardUsersPage(props: DashboardUsersPageProps): JSX.Element {
  const { t } = useTranslation("web");
  const userService = useUserService();
  const getApiUsersInstance = userService.useGetApiUsers();
  const getApiUsersResult = getApiUsersInstance.useQuery();
  const navigateService = useNavigateService();
  const validationForm1Schema = useMemo(() => yup.object().shape({}), []);
  const formForm1 = useForm<Form1FormData>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: yupResolver(validationForm1Schema),
    shouldFocusError: true,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { errors: formForm1Errors } = formForm1.formState;

  useEffect(() => {
    formForm1.reset({});
  }, []);

  const columnsTable1 = useMemo<TableColumnDefinition<any>[]>(
    () => [
      { path: "id", name: "Id", sortable: false },
      { path: "username", name: "Username", sortable: false },
      { path: "created_at", name: "Created At", sortable: false },
      { path: "updated_at", name: "Updated At", sortable: false },
      { path: "created_at", name: "Created At", sortable: false },
      { path: "updated_at", name: "Updated At", sortable: false },
      { path: "isactive", name: "Isactive", sortable: false },
      { path: "dateofbirth", name: "Dateofbirth", sortable: false },
      { path: "email", name: "Email", sortable: false },
    ],
    []
  );

  const actionsTable1 = useMemo<TableColumnDefinition<any>[]>(
    () => [
      {
        name: "Delete",
        renderColumn: (props) => {
          return <Modal {...props.row.original} />;
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

  const handleButton1 = async () => {
    try {
      navigateService.navigate("/newAdmin/dashboard/users/:userId");
    } catch (e: unknown) {}
  };
  const handleButton0 = async (values?: Form1FormData) => {
    try {
      const responseGetApiUsers = await getApiUsersInstance.fetch({
        users: { username: get(values, "input_userName", "") },
      });
    } catch (e: unknown) {}
  };
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
                <Box className={styles.box_1}>
                  <Box className={styles.box_3}>
                    <Text className={styles.text_0} textType="Text">
                      {t("dashboard_users.text_0")}
                    </Text>
                    <Button
                      buttonType="primary"
                      className={styles.button_1}
                      onClick={handleButton1}
                    >
                      {t("dashboard_users.button_1")}
                    </Button>
                  </Box>
                  <Box className={styles.form_1}>
                    <Controller
                      control={formForm1.control}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { isTouched, error },
                      }: any) => {
                        return (
                          <Input
                            inputStyle={styles.input_user_name_input}
                            placeholder={t("dashboardusers.input_1")}
                            className={styles.input_user_name}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="input_userName"
                    />
                    <Button
                      buttonType="primary"
                      className={styles.button_0}
                      onClick={formForm1.handleSubmit(handleButton0)}
                    >
                      Search
                    </Button>
                  </Box>
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
                      data={undefined}
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
export default DashboardUsersPage;
