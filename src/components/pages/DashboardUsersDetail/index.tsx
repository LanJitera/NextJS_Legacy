/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardNavbar from "@components/molecules/DashboardNavbar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DashboardFooter from "@components/molecules/DashboardFooter";
import { useTranslation } from "next-i18next";
import { useAuthenticationService } from "@services/authentication";
import {
  Page,
  Box,
  Row,
  Col,
  Text,
  Input,
  DateTimePicker,
  Button,
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardUsersDetailPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_userName: string;
  input_Email: string;
  input_Password: string;
  datetimepicker_1: string;
  password_confirmation: string;
}
function DashboardUsersDetailPage(props: DashboardUsersDetailPageProps): JSX.Element {
  const { t } = useTranslation("web");
  const authenticationService = useAuthenticationService();
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        input_userName: yup.string().required("input_userName is a required field"),
        input_Email: yup.string().email().required("input_Email is a required field"),
        input_Password: yup.string().required("input_Password is a required field"),
        password_confirmation: yup
        .string()
        .oneOf([yup.ref("input_Password"), null], "Passwords must match"),
      }),
    []
  );
  console.log(props?.query?.userId)
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
  if(props?.query?.userId === undefined){
    formForm1.setValue('input_userName', props.query.userId);
  }else{
    formForm1.reset({});
  }
  }, [props?.query?.userId]);
  const handleRegiter = async (values?: Form1FormData) => {
    try {
      await authenticationService.signupWithEmail("users", {
        user: {
          password: get(values, "input_Password", ""),
          password_confirmation: get(values, "password_confirmation", ""),
          username: get(values, "input_userName", ""),
          email: get(values, "input_Email", ""),
          dateofbirth: get(values, "datetimepicker_1", ""),
        },
      });
      Toast.success("Sign Up Success" || "");
    } catch (e: unknown) {
      Toast.error("Registration failed" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <DashboardNavbar className={styles.dashboardnavbar_1} />
      <Box className={styles.dashboard_main}>
        <Box className={styles.dashboard_main_wrapper}>
          <Row align="top" gutter={[30, 30]} justify="start" className={styles.row_1}>
            <Col md={Number(24)} xl={Number(24)} xs={Number(24)}>
              <Box className={styles.dashboard_content}>
                <Box className={styles.dashboard_content_title}>
                  <Text className={styles.text_9} textType="Text">
                    Users Detail
                  </Text>
                </Box>
                <Box className={styles.dashboard_content_filter_table}>
                  <Box className={styles.box_1}>
                    <Box className={styles.form_1}>
                      <Box className={styles.box_3}>
                        <Box className={styles.box_4}>
                          <Text className={styles.text_1} textType="Text">
                            {/* {t("dashboard_users_detail.text_1")} */}
                            Tên người dùng
                          </Text>
                          <Text className={styles.text_2} textType="Text">
                            *
                          </Text>
                        </Box>
                        <Controller
                          control={formForm1.control}
                          render={({
                            field: { onChange, onBlur, value },
                            fieldState: { isTouched, error },
                          }: any) => {
                            return (
                              <Input
                                inputStyle={styles.input_user_name_input}
                                // placeholder={t("dashboard_users_detail.input_username")}
                                placeholder="User name"
                                className={styles.input_user_name}
                                onChange={onChange}
                                value={value}
                              />
                            );
                          }}
                          name="input_userName"
                        />
                        <Box className={styles.box_5}>
                          <Text className={styles.text_3} textType="Text">
                            {get(formForm1Errors, "input_userName.message")}
                          </Text>
                        </Box>
                      </Box>
                      <Box className={styles.box_6}>
                        <Box className={styles.box_7}>
                          <Text className={styles.text_4} textType="Text">
                            {/* {t("dashboard_users_detail.text_4")} */}
                            Email
                          </Text>
                          <Text className={styles.text_5} textType="Text">
                            *
                          </Text>
                        </Box>
                        <Controller
                          control={formForm1.control}
                          render={({
                            field: { onChange, onBlur, value },
                            fieldState: { isTouched, error },
                          }: any) => {
                            return (
                              <Input
                                inputStyle={styles.input_email_input}
                                // placeholder={t("dashboard_users_detail.input_0")}
                                 placeholder="Email"
                                className={styles.input_email}
                                onChange={onChange}
                                value={value}
                              />
                            );
                          }}
                          name="input_Email"
                        />
                        <Box className={styles.box_8}>
                          <Text className={styles.text_6} textType="Text">
                            {get(formForm1Errors, "input_Email.message")}
                          </Text>
                        </Box>
                      </Box>
                      <Box className={styles.box_9}>
                        <Box className={styles.box_10}>
                          <Text className={styles.text_7} textType="Text">
                            {t("sign_up.text_10")}
                          </Text>
                          <Text className={styles.text_8} textType="Text">
                            *
                          </Text>
                        </Box>
                        <Controller
                          control={formForm1.control}
                          render={({
                            field: { onChange, onBlur, value },
                            fieldState: { isTouched, error },
                          }: any) => {
                            return (
                              <Input
                                inputStyle={styles.input_password_input}
                                isPasswordField
                                placeholder={t("sign_up.input_2")}
                                className={styles.input_password}
                                onChange={onChange}
                                value={value}
                              />
                            );
                          }}
                          name="input_Password"
                        />
                        <Box className={styles.box_11}>
                          <Text className={styles.text_10} textType="Text">
                            {get(formForm1Errors, "input_Password.message")}
                          </Text>
                        </Box>
                      </Box>
                      <Box className={styles.box_9}>
                        <Box className={styles.box_10}>
                          <Text className={styles.text_7} textType="Text">
                            {t("sign_up.text_11")}
                          </Text>
                          <Text className={styles.text_8} textType="Text">
                            *
                          </Text>
                        </Box>
                        <Controller
                          control={formForm1.control}
                          render={({
                            field: { onChange, onBlur, value },
                            fieldState: { isTouched, error },
                          }: any) => {
                            return (
                              <Input
                                inputStyle={styles.input_password_input}
                                isPasswordField
                                placeholder={t("sign_up.input_2")}
                                className={styles.input_password}
                                onChange={onChange}
                                value={value}
                              />
                            );
                          }}
                          name="password_confirmation"
                        />
                        <Box className={styles.box_11}>
                          <Text className={styles.text_10} textType="Text">
                            {get(formForm1Errors, "password_confirmation.message")}
                          </Text>
                        </Box>
                      </Box>
                      <Box className={styles.box_12}>
                        <Box className={styles.box_13}>
                          <Box className={styles.box_14}>
                            <Text className={styles.text_11} textType="Text">
                              {t("signup.datetimepicker_1_label")}
                            </Text>
                            <Text className={styles.text_12} textType="Text">
                              *
                            </Text>
                          </Box>
                          <Controller
                            control={formForm1.control}
                            render={({
                              field: { onChange, onBlur, value },
                              fieldState: { isTouched, error },
                            }: any) => {
                              return (
                                <DateTimePicker
                                  format="dd/MM/yyyy"
                                  picker="date"
                                  className={styles.datetimepicker_1}
                                  onChange={onChange}
                                  value={value}
                                />
                              );
                            }}
                            name="datetimepicker_1"
                          />
                        </Box>
                        <Box className={styles.box_15}>
                          <Text className={styles.text_13} textType="Text">
                            {get(formForm1Errors, "datetimepicker_1.message")}
                          </Text>
                        </Box>
                      </Box>
                      <Button
                        buttonType="primary"
                        className={styles.button_1}
                        onClick={formForm1.handleSubmit(handleRegiter)}
                      >
                        <Text className={styles.text_14} textType="Text">
                          {t("sign_up.text_13")}
                        </Text>
                      </Button>
                    </Box>
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
export default DashboardUsersDetailPage;
