/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  useRef,
} from "react";
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
import { Space, Table, Tag } from "antd";
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
  Toast,
  // Table,
} from "@jitera/jitera-web-ui-library";
import { Modal as NewModal } from "../../../../libraries/jitera-web-ui-library/src/components/atoms/Modal/Modal.component";
import ModalMolecule from "../../molecules/Modal";
import dateFormat, { masks } from "dateformat";
import styles from "./styles.module.css";
import * as XLSX from "xlsx";
import { getEnvironmentData } from "worker_threads";
import { Document, Page as Page2 } from "react-pdf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



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
  const getApiPartiesResult = getApiPartiesInstance.useQuery({
    // pagination_limit: Number(20),
  });
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

  //table ant design
  const columns = [
    {
      title: "Name party",
      dataIndex: "nameparty",
      key: "nameparty",
      fixed: "left",
      width: 150,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Party start time",
      dataIndex: "partystarttime",
      key: "partystarttime",
      render: (partystarttime) => dateFormat(partystarttime, "paddedShortDate"),
    },
    {
      title: "Party location",
      dataIndex: "partylocation",
      key: "partylocation",
    },
    {
      title: "Status",
      key: "isstatus",
      dataIndex: "isstatus",
      render: (isstatus) => {
        let color =
          isstatus === "Public"
            ? "green"
            : isstatus === "Close"
            ? "red"
            : isstatus === "Draft"
            ? "geekblue"
            : "yellow";
        return (
          <Tag color={color} key={isstatus}>
            {isstatus}
          </Tag>
        );
      },
    },
    {
      title: "Describe",
      dataIndex: "describe",
      key: "describe",
    },
    {
      title: "Required age",
      dataIndex: "requiredage",
      key: "requiredage",
    },
    {
      title: "Joined",
      dataIndex: "requiredage",
      key: "requiredage",
      render: (_, record) => (
        <span>
          {
            record.partybookings.filter((item) => {
              return item.status === "Approve";
            }).length
          }
        </span>
      ),
    },
    {
      title: "Delete",
      key: "action",
      render: (_, record) =>
        record.isstatus !== "Draft" ? (
          <Space size="middle">
            <a disabled={true}>Delete</a>
          </Space>
        ) : (
          <Space size="middle">
            <a onClick={() => handleOpenModalDelete(record)}>Delete</a>
          </Space>
        ),
    },
    {
      title: "Edit",
      key: "action",
      render: (_, record) =>
        record.admin_id === props?.session?.user?.authenticatedId ? (
          <Space size="middle">
            <a onClick={() => navigateParties(record)}>Edit</a>
          </Space>
        ) : (
          <Space size="middle">
            <a disabled={true}>Edit</a>
          </Space>
        ),
    },
    {
      title: "List member",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigateListMember(record.id)}>List member</a>
        </Space>
      ),
    },
  ];

  const handleOpenModalDelete = (record) => {
    NewModal.show(
      <ModalMolecule
        labelMain="Bạn có muốn xoá không ?"
        label=" - "
        labelButtonYes="Delete"
        labaelButtonCancel="Cancel"
        recordId={record?.id}
        onYes={() => handleDeleteParty(record?.id)}
      />
    );
  };

  const handlePaginationTable1 = async (
    pageIndex?: number,
    pageSize?: number
  ) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        pagination_page: pageIndex,
        pagination_limit: pageSize,
      });
    } catch (e: unknown) {}
  };

  const navigateParties = async (record) => {
    try {
      navigateService.navigate(`/newAdmin/dashboard/parties/${record.id}`);
    } catch (e: unknown) {}
  };
  const navigateListMember = async (id) => {
    try {
      navigateService.navigate(`/newAdmin/dashboard/ListMemBer/${id}`);
    } catch (e: unknown) {}
  };
  const handleButton1 = async (values?: Form1FormData) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          nameparty: get(values, "input_nameParty", ""),
          partylocation: get(values, "input_location", ""),
          isstatus:
            get(values, "select_status") === "All"
              ? undefined
              : get(values, "select_status", undefined),
        },
      });
    } catch (e: unknown) {}
  };
  const handleDeleteParty = async (id) => {
    try {
      const responseDeleteApiPartiesId =
        await partyService.deleteApiPartiesId.fetch({ id });
      Toast.success("Xoá thành công" || "");
      NewModal.hide();
    } catch (e: unknown) {
      Toast.error("Xoá thất bại " || "");
      NewModal.hide();
    }
  };

  const handleExprotExcelParty =  () => {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(getApiPartiesResult?.data?.parties);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet");
      XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const handleExportPdfParty =  (values?: Form1FormData) => {
      const partyData = getApiPartiesResult?.data?.parties.map((item) => {
        let formatPartyStartTime = dateFormat(
          item.partystarttime,
          "paddedShortDate"
        );
        return [
          item.nameparty,
          // dateFormat(item, "paddedShortDate"),
          formatPartyStartTime,
          item.partylocation,
          item.isstatus,
          item.describe,
          item.requiredage,
          item.admin_id,
        ];
      });

      const doc = new jsPDF();
      doc.addFont("https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf", "Roboto", "normal"); // Thêm phông chữ Roboto
      doc.setFont("Roboto");
      autoTable(doc, { html: "#my-table" });
      // Or use javascript directly:
      autoTable(doc, {
        theme: "striped",
        columnStyles: { 0: {  minCellWidth: 60 } },
        styles: {  font: 'Roboto'},
        // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
        // margin: { top: 10 },
        head: [
          [
            "nameparty",
            "partystarttime",
            "partylocation",
            "isstatus",
            "describe",
            "requiredage",
            "admin_id",
          ],
        ],
        body: partyData,
      });
      doc.save("table.pdf");

  };

  return (
    <Page className={styles.page_container}>
      <DashboardNavbar className={styles.dashboardnavbar_1} />
      <Box className={styles.dashboard_main}>
        <Box className={styles.dashboard_main_wrapper}>
          <Row
            align="top"
            gutter={[30, 30]}
            justify="start"
            className={styles.row_1}
          >
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
                      onClick={navigateParties}
                    >
                      Create new party
                    </Button>
                  </Box>
                  <Box className={styles.form_1}>
                    <Box className={styles.form_1_All}>
                      <Box className={styles.search_All}>
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
                                    { value: "All", label: "All" },
                                    { value: "Public", label: "Public" },
                                    { value: "Private", label: "Private" },
                                    { value: "Draft", label: "Draft" },
                                    { value: "Close", label: "Close" },
                                  ]}
                                  iconProps={{
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
                        <Button
                          buttonType="primary"
                          className={styles.button_1}
                          onClick={formForm1.handleSubmit(handleButton1)}
                        >
                          Search
                        </Button>
                      </Box>
                      <Box className={styles.export_All}>
                        <Button
                          buttonType="primary"
                          className={styles.button_0}
                          onClick={formForm1.handleSubmit(
                            handleExprotExcelParty
                          )}
                        >
                          Export
                        </Button>
                        <Button
                          buttonType="primary"
                          className={styles.button_0}
                          onClick={handleExportPdfParty}
                        >
                          PDF
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={styles.dashboard_content_filter_table}>
                  <Box className={styles.box_8}>
                    <Table
                      columns={columns}
                      dataSource={get(getApiPartiesResult, "data.parties")}
                      scroll={{
                        x: 1500,
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
export default DashboardPartiesPage;
