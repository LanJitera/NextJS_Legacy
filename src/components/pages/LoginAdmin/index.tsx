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
import { Page, Box, Text, Input, Button, Toast } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type LoginAdminPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_email: string;
  input_password: string;
}
function LoginAdminPage(props: LoginAdminPageProps): JSX.Element {
  const { t } = useTranslation("web");
  const authenticationService = useAuthenticationService();
  const navigateService = useNavigateService();
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        input_email: yup.string().required("input_email is a required field"),
      }),
    []
  );
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

  const handleButton1 = async (values?: Form1FormData) => {
    try {
      await authenticationService.loginWithEmail("admins", {
        email: get(values, "input_email", ""),
        password: get(values, "input_password", ""),
      });
      navigateService.navigate("/newAdmin/dashboard/parties");
    } catch (e: unknown) {
      Toast.error("Account password is not correct" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <Box className={styles.box_2}>
        <Image
          src={assets("16867118351071i0i3jhzu13af58qoc1bzf4xl9phpng")}
          alt={""}
          className={styles.image_1}
        />
        <Box className={styles.box_0}>
          <Box className={styles.form_1}>
            <Text className={styles.text_1} textType="Text">
              {t("login_user.form_1_name")}
            </Text>
            <Box className={styles.box_2}>
              <Box className={styles.box_3}>
                <Text className={styles.text_0} textType="Text">
                  {t("login_admin.text_0")}
                </Text>
                <Text className={styles.text_2} textType="Text">
                  {t("login_admin.text_2")}
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
                      placeholder={t("login_admin.input_1")}
                      className={styles.input_email}
                      onChange={onChange}
                      value={value}
                    />
                  );
                }}
                name="input_email"
              />
              <Box className={styles.box_4}>
                <Text className={styles.text_3} textType="Text">
                  {get(formForm1Errors, "input_email.message")}
                </Text>
              </Box>
            </Box>
            <Box className={styles.box_5}>
              <Box className={styles.box_6}>
                <Text className={styles.text_4} textType="Text">
                  {t("login_admin.text_4")}
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
                      inputStyle={styles.input_password_input}
                      isPasswordField
                      placeholder={t("login_admin.input_0")}
                      className={styles.input_password}
                      onChange={onChange}
                      value={value}
                    />
                  );
                }}
                name="input_password"
              />
              <Box className={styles.box_7}>
                <Text className={styles.text_6} textType="Text">
                  {get(formForm1Errors, "input_password.message")}
                </Text>
              </Box>
            </Box>
            <Button
              buttonType="primary"
              className={styles.button_1}
              onClick={formForm1.handleSubmit(handleButton1)}
            >
              <Text className={styles.text_7} textType="Text">
                {t("login_admin.text_7")}
              </Text>
            </Button>
            <Box className={styles.box_8}>
              <Text className={styles.text_8} textType="Text">
                {t("login_user.text_5")}
              </Text>
              <Text href={"/NewUser/sign-up"} className={styles.text_9} textType="Link">
                {t("login_user.text_6")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default LoginAdminPage;
