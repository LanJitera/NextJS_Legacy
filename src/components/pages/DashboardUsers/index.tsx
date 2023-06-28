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
import { Modal as NewModal } from "../../../../libraries/jitera-web-ui-library/src/components/atoms/Modal/Modal.component";
import ModalMolecule from "../../molecules/Modal";
import dateFormat, { masks } from "dateformat";
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
  Toast,
  // Table,
} from "@jitera/jitera-web-ui-library";
import { Space, Table, Tag } from "antd";
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

  //table ant design
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "User Name",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Ngày tạo",
      key: "created_at",
      dataIndex: "created_at",
      render: (created_at) => dateFormat(created_at, "paddedShortDate"),
    },
    {
      title: "Birthday",
      dataIndex: "dateofbirth",
      key: "dateofbirth",
      render: (dateofbirth) => dateFormat(dateofbirth, "paddedShortDate"),
    },
    {
      title: "Delete",
      key: "Delete ",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleOpenModal(record)}>Delete</a>
        </Space>
      ),
    },
    {
      title: "Edit",
      key: "Reject ",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a onClick={() => handleOpenModalReject(record)}>Reject </a>
      //   </Space>
      // ),
    },
  ];
  const handleOpenModal = (record) => {
    NewModal.show(
      <ModalMolecule
        labelMain="Bạn có muốn xoá không ?"
        label=" - "
        labelButtonYes="Delete"
        labaelButtonCancel="Cancel"
        recordId={record?.id}
        onYes={() => handleDeleteUser(record?.id)}
      />
    );
  };
  const handleButton1 = async () => {
    try {
      navigateService.navigate("/newAdmin/dashboard/users/:userId");
    } catch (e: unknown) {}
  };
  const handleButtonSearch = async (values?: Form1FormData) => {
    try {
      const responseGetApiUsers = await getApiUsersInstance.fetch({
        users: { username: get(values, "input_userName", "") },
      });
    } catch (e: unknown) {}
  };

  const handleDeleteUser = async (id) => {
    try {
      const responseDeleteApiPartiesId =
        await userService.deleteApiUsersId.fetch({id});
      Toast.success("Xoá thành công" || "");
      NewModal.hide();
    } catch (e: unknown) {
      Toast.error("Xoá thất bại " || "");
      NewModal.hide();
    }
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
                <Box className={styles.box_1}>
                  <Box className={styles.box_3}>
                    <Text className={styles.text_0} textType="Text">
                      List User
                    </Text>
                    <Button
                      buttonType="primary"
                      className={styles.button_1}
                      onClick={handleButton1}
                    >
                      Tạo mới user
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
                            placeholder="Enter user name"
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
                      onClick={formForm1.handleSubmit(handleButtonSearch)}
                    >
                      Search
                    </Button>
                  </Box>
                </Box>
                <Box className={styles.dashboard_content_filter_table}>
                  <Box className={styles.box_8}>
                    <Table
                      columns={columns}
                      dataSource={get(getApiUsersResult, "data.users")}
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
