/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import assets from "@assets/index";
import { useTranslation } from "next-i18next";
import { useAuthenticationService } from "@services/authentication";
import { useNavigateService } from "@services/navigate";
import {
  Page,
  Box,
  Text,
  Input,
  DateTimePicker,
  Button,
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type SignUpPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form2FormData {
  input_username: string;
  input_email: string;
  input_password: string;
  datetimepicker_1: string;
}
function SignUpPage(props: SignUpPageProps): JSX.Element {
  const { t } = useTranslation("web");
  const authenticationService = useAuthenticationService();
  const navigateService = useNavigateService();
  const validationForm2Schema = useMemo(
    () =>
      yup.object().shape({
        input_username: yup.string().required("input_username is a required field"),
        input_email: yup.string().email().required("input_email is a required field"),
        input_password: yup.string().required("input_password is a required field"),
      }),
    []
  );
  const formForm2 = useForm<Form2FormData>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: yupResolver(validationForm2Schema),
    shouldFocusError: true,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { errors: formForm2Errors } = formForm2.formState;

  useEffect(() => {
    formForm2.reset({});
  }, []);

  const handleButton0 = async (values?: Form2FormData) => {
    try {
      await authenticationService.signupWithEmail("users", {
        email: get(values, "input_email", ""),
        password: get(values, "input_password", ""),
      });
      navigateService.navigate("/User/login");
    } catch (e: unknown) {
      Toast.error("Registration failed" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <Box className={styles.box_1}>
        <Image
          src={assets("16867118351071i0i3jhzu13af58qoc1bzf4xl9phpng")}
          alt={""}
          className={styles.image_0}
        />
        <Box className={styles.box_0}>
          <Box className={styles.form_2}>
            <Text className={styles.text_0} textType="Text">
              {t("sign_up.text_0")}
            </Text>
            <Box className={styles.box_2}>
              <Box className={styles.box_4}>
                <Text className={styles.text_1} textType="Text">
                  {t("signup.text_1")}
                </Text>
                <Text className={styles.text_2} textType="Text">
                  *
                </Text>
              </Box>
              <Controller
                control={formForm2.control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { isTouched, error },
                }: any) => {
                  return (
                    <Input
                      inputStyle={styles.input_username_input}
                      placeholder={t("sign_up.input_0")}
                      className={styles.input_username}
                      onChange={onChange}
                      value={value}
                    />
                  );
                }}
                name="input_username"
              />
              <Box className={styles.box_5}>
                <Text className={styles.text_3} textType="Text">
                  {get(formForm2Errors, "input_username.message")}
                </Text>
              </Box>
            </Box>
            <Box className={styles.box_3}>
              <Box className={styles.box_7}>
                <Text className={styles.text_email} textType="Text">
                  {t("sign_up.text_5")}
                </Text>
                <Text className={styles.text_6} textType="Text">
                  *
                </Text>
              </Box>
              <Controller
                control={formForm2.control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { isTouched, error },
                }: any) => {
                  return (
                    <Input
                      inputStyle={styles.input_email_input}
                      placeholder={t("sign_up.input_1")}
                      className={styles.input_email}
                      onChange={onChange}
                      value={value}
                    />
                  );
                }}
                name="input_email"
              />
              <Box className={styles.box_10}>
                <Text className={styles.text_9} textType="Text">
                  {get(formForm2Errors, "input_email.message")}
                </Text>
              </Box>
            </Box>
            <Box className={styles.box_11}>
              <Box className={styles.box_12}>
                <Text className={styles.text_10} textType="Text">
                  {t("sign_up.text_10")}
                </Text>
                <Text className={styles.text_11} textType="Text">
                  *
                </Text>
              </Box>
              <Controller
                control={formForm2.control}
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
                name="input_password"
              />
              <Box className={styles.box_13}>
                <Text className={styles.text_12} textType="Text">
                  {get(formForm2Errors, "input_password.message")}
                </Text>
              </Box>
            </Box>
            <Box className={styles.box_6}>
              <Box className={styles.datetimepicker_1_container}>
                <Box className={styles.datetimepicker_1_inner}>
                  <Text className={styles.datetimepicker_1_label} textType="Text">
                    {t("signup.datetimepicker_1_label")}
                  </Text>
                  <Text className={styles.datetimepicker_1_required} textType="Text">
                    *
                  </Text>
                </Box>
                <Controller
                  control={formForm2.control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { isTouched, error },
                  }: any) => {
                    return (
                      <DateTimePicker
                        format="yyyy-MM-dd"
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
              <Box className={styles.box_9}>
                <Text className={styles.text_8} textType="Text">
                  {get(formForm2Errors, "datetimepicker_1.message")}
                </Text>
              </Box>
            </Box>
            <Button
              buttonType="primary"
              className={styles.button_0}
              onClick={formForm2.handleSubmit(handleButton0)}
            >
              <Text className={styles.text_13} textType="Text">
                {t("sign_up.text_13")}
              </Text>
            </Button>
            <Box className={styles.box_14}>
              <Text className={styles.text_14} textType="Text">
                {t("sign_up.text_14")}
              </Text>
              <Text href={"/NewUser/login"} className={styles.text_15} textType="Link">
                {t("sign_up.text_15")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default SignUpPage;
