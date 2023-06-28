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
import { usePartyService } from "@services/party";
import { useNavigateService } from "@services/navigate";
import DashboardButton from "@components/molecules/DashboardButton";
import {
  Page,
  Box,
  Row,
  Col,
  Text,
  Button,
  Select,
  Input,
  TableColumnDefinition,
  Table,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardPartiesPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  select_status: string;
  input_nameParty: string;
  input_location: string;
}
function DashboardPartiesPage(props: DashboardPartiesPageProps): JSX.Element {
  const partyService = usePartyService();
  const getApiPartiesInstance = partyService.useGetApiParties();
  const getApiPartiesResult = getApiPartiesInstance.useQuery({ pagination_limit: Number(20) });
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
      { path: "img", name: "Img", sortable: false },
      { path: "created_at", name: "Created At", sortable: false },
      { path: "nameparty", name: "Nameparty", sortable: false },
      { path: "partystarttime", name: "Partystarttime", sortable: false },
      { path: "partylocation", name: "Partylocation", sortable: false },
      { path: "numberofpeople", name: "Numberofpeople", sortable: false },
      { path: "isstatus", name: "Isstatus", sortable: false },
      { path: "describe", name: "Describe", sortable: false },
      { path: "requiredage", name: "Requiredage", sortable: false },
    ],
    []
  );

  const handlePaginationTable1 = async (pageIndex?: number, pageSize?: number) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        pagination_page: pageIndex,
        pagination_limit: pageSize,
      });
    } catch (e: unknown) {}
  };
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
      {
        name: "List member",
        renderColumn: (props) => {
          return <DashboardButton {...props.row.original} />;
        },
      },
    ],
    []
  );

  const handleButton0 = async () => {
    try {
      navigateService.navigate("/newAdmin/dashboard/parties/:partyId");
    } catch (e: unknown) {}
  };
  const handleButton1 = async (values?: Form1FormData) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          nameparty: get(values, "input_nameParty", ""),
          partylocation: get(values, "input_location", ""),
          isstatus: get(values, "select_status", ""),
        },
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
                <Box className={styles.dashboard_content_title}>
                  <Box className={styles.box_7}>
                    <Text className={styles.text_9} textType="Text">
                      Parties
                    </Text>
                    <Button
                      buttonType="primary"
                      className={styles.button_0}
                      onClick={handleButton0}
                    >
                      Create new party
                    </Button>
                  </Box>
                  <Box className={styles.form_1}>
                    <Box className={styles.select_1_container}>
                      <Controller
                        control={formForm1.control}
                        render={({
                          field: { onChange, onBlur, value },
                          fieldState: { isTouched, error },
                        }: any) => {
                          return (
                            <Select
                              containerStyle={{
                                borderColor: "#177ddc",
                                borderStyle: "solid",
                                borderWidth: "3px",
                                height: "auto",
                              }}
                              data={[
                                { value: "public", label: "Public" },
                                { value: "private", label: "Private" },
                                { value: "daft", label: "Daft" },
                                { value: "close", label: "Close" },
                              ]}
                              /*TODO: generate error key: defaultValue*/ iconProps={{
                                color: "#000",
                                iconName: "FaChevronDown",
                                size: 16,
                              }}
                              placeholder={"Placeholder"}
                              onChange={onChange}
                              value={value}
                            />
                          );
                        }}
                        name="select_status"
                      />
                    </Box>
                    <Controller
                      control={formForm1.control}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { isTouched, error },
                      }: any) => {
                        return (
                          <Input
                            inputStyle={styles.input_name_party_input}
                            placeholder={"Input name party"}
                            className={styles.input_name_party}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="input_nameParty"
                    />

                    <Controller
                      control={formForm1.control}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { isTouched, error },
                      }: any) => {
                        return (
                          <Input
                            inputStyle={styles.input_location_input}
                            placeholder={"Input location"}
                            className={styles.input_location}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="input_location"
                    />
                    <Button
                      buttonType="primary"
                      className={styles.button_1}
                      onClick={formForm1.handleSubmit(handleButton1)}
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
                      data={get(getApiPartiesResult, "data.parties")}
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
                      isPaginationEnabled
                      onPaginationChange={handlePaginationTable1}
                      pageSize={Number(20)}
                      paginationPosition="left"
                      paginationWrapperStyle={{ marginTop: "12px" }}
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
                      totalPage={get(getApiPartiesResult, "data.total_pages")}
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
export default DashboardPartiesPage;
