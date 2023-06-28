/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardNavbar from "@components/molecules/DashboardNavbar";
import DashboardSidebar from "@components/molecules/DashboardSidebar";
import { ArrayElement } from "@utils/array";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DashboardFooter from "@components/molecules/DashboardFooter";
import { usePartybookingService } from "@services/partybooking";
import DashboardButton from "@components/molecules/DashboardButton";
import { Modal as NewModal } from "../../../../libraries/jitera-web-ui-library/src/components/atoms/Modal/Modal.component";
import ModalMolecule from "../../molecules/Modal";
import dateFormat, { masks } from "dateformat";
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
import { Space, Table, Tag } from "antd";
import styles from "./styles.module.css";
type DashboardListMemberPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
interface Form1FormData {
  select_status: string;
  input_nameParty: string;
  input_location: string;
}
function DashboardListMemberPage(
  props: DashboardListMemberPageProps
): JSX.Element {
  const partybookingService = usePartybookingService();
  const getApiPartybookingsInstance =
    partybookingService.useGetApiPartybookings();
  const getApiPartybookingsResult = getApiPartybookingsInstance.useQuery({
    partybookings: { party_id: props?.query?.partybookingId },
  });

console.log(getApiPartybookingsResult);

  
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
  // useEffect(() => {
  //   console.log(get(getApiPartybookingsResult, "data.partybookings"));
  //   const newData = get(getApiPartybookingsResult, "data.partybookings")?.map(
  //     (item) => ({
  //       ...item,
  //       userName: item.user.name,
  //     })
  //   );
  //   console.log(newData, "newdata here");

  // }, [get(getApiPartybookingsResult, "data.partybookings")]);

  //table ant design
  const columns = [
    {
      title: "ID",
      key: "id",
      render: (_, record) => <span>{record.user.id}</span>,
    },
    {
      title: "User Name",
      key: "user",
      dataIndex: ["user", "name"],
    },
    {
      title: "Email",
      key: "email",
      dataIndex: ["user", "email"],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "Approve"
            ? "green"
            : status === "Reject"
            ? "red"
            : status === "Unvalue"
            ? "geekblue"
            : "yellow";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Birthday",
      dataIndex: "dateofbirth",
      key: "dateofbirth",
      render: (dateofbirth) => dateFormat(dateofbirth, "paddedShortDate"),
    },
    {
      title: "Approve",
      key: "Approve ",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleOpenModalApprove(record)}>Approve </a>
        </Space>
      ),
    },
    {
      title: "Reject",
      key: "Reject ",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleOpenModalReject(record)}>Reject </a>
        </Space>
      ),
    },
  ];

  const handleApproveUser = async (record) => {
    try {
      const responseDeleteApiPartiesId =
        await partybookingService.putApiPartybookingsId.fetch({
          id: record.id,
          partybookings: {
            user_id: record.user.id,
            party_id: record.party_id,
            status: "Approve",
          },
        });

      Toast.success("Cập nhật thành công" || "");
      NewModal.hide();
    } catch (e: unknown) {
      Toast.error("Cập nhật thất bại " || "");
      NewModal.hide();
    }
  };
  const handleRejectUser = async (record) => {
    try {
      const responseDeleteApiPartiesId =
        await partybookingService.putApiPartybookingsId.fetch({
          id: record.id,
          partybookings: {
            user_id: record.user.id,
            party_id: record.party_id,
            status: "Reject",
          },
        });
      Toast.success("Cập nhật thành công" || "");
      NewModal.hide();
    } catch (e: unknown) {
      Toast.error("Cập nhật thất bại " || "");
      NewModal.hide();
    }
  };
  const handleOpenModalApprove = (record) => {
    NewModal.show(
      <ModalMolecule
        labelMain="Do you want to Approve ?"
        label=" - "
        labelButtonYes="Approve"
        labaelButtonCancel="Cancel"
        recordId={record?.id}
        onYes={() => handleApproveUser(record)}
      />
    );
  };
  const handleOpenModalReject = (record) => {
    NewModal.show(
      <ModalMolecule
        labelMain="Do you want to Approve ?"
        label=" - "
        labelButtonYes="Reject"
        labaelButtonCancel="Cancel"
        recordId={record?.id}
        onYes={() => handleRejectUser(record)}
      />
    );
  };
  const handleFilterUserName = async (values?: Form1FormData) => {
    try {
      const responseGetApiParties = await getApiPartybookingsInstance.fetch({
        partybookings: {
          party_id: props?.query?.partybookingId,
          username: get(values, "input_userName", ""),
        },
      });
      console.log(responseGetApiParties);
    } catch (e: unknown) {}
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
                      List Member (
                      {
                        getApiPartybookingsResult?.data?.partybookings?.[0]
                          .party?.nameparty
                      }
                      )
                    </Text>
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
                            inputStyle={styles.input_name_party_input}
                            placeholder={"Input name party"}
                            className={styles.input_name_party}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="input_userName"
                    />
                    <Button
                      buttonType="primary"
                      className={styles.button_1}
                      onClick={formForm1.handleSubmit(handleFilterUserName)}
                    >
                      Search
                    </Button>
                  </Box>
                </Box>
                <Box className={styles.dashboard_content_filter_table}>
                  <Box className={styles.box_1}>
                    <Table
                      columns={columns}
                      dataSource={get(
                        getApiPartybookingsResult,
                        "data.partybookings"
                      )}
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
export default DashboardListMemberPage;
