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
  Button,
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type LoginUserPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_email: string;
  input_password: string;
}
function LoginUserPage(props: LoginUserPageProps): JSX.Element {
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

  const handleForm1Button = async (values?: Form1FormData) => {
    try {
      await authenticationService.loginWithEmail("users", {
        email: get(values, "input_email", ""),
        password: get(values, "input_password", ""),
      });
      navigateService.navigate("/User/home");
    } catch (e: unknown) {
      Toast.error("Account password is not correct" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <Box className={styles.header11}>
        <Image
          src={assets("16867118351071i0i3jhzu13af58qoc1bzf4xl9phpng")}
          alt={""}
          className={styles.image_1}
        />
        <Box className={styles.box_3}>
          <Box className={styles.form_1}>
            <Text className={styles.form_1_name} textType="Text">
              {t("login_user.form_1_name")}
            </Text>
            <Box className={styles.input_1_container}>
              <Box className={styles.box_1}>
                <Text className={styles.text_1} textType="Text">
                  {t("login_user.text_1")}
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
                      inputStyle={styles.input_email_input}
                      placeholder={t("login_user.input_1")}
                      className={styles.input_email}
                      onChange={onChange}
                      value={value}
                    />
                  );
                }}
                name="input_email"
              />
              <Box className={styles.input_1_error_message_container}>
                <Text
                  className={styles.input_1_error_message_text}
                  textType="Text"
                >
                  {get(formForm1Errors, "input_email.message")}
                </Text>
              </Box>
            </Box>
            <Box className={styles.input_2_container}>
              <Box className={styles.box_2}>
                <Text className={styles.text_3} textType="Text">
                  {t("login_user.text_3")}
                </Text>
                <Text className={styles.text_4} textType="Text">
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
                      placeholder={t("login_user.input_2")}
                      className={styles.input_password}
                      onChange={onChange}
                      value={value}
                    />
                  );
                }}
                name="input_password"
              />
              <Box className={styles.input_2_error_message_container}>
                <Text
                  className={styles.input_2_error_message_text}
                  textType="Text"
                >
                  {get(formForm1Errors, "input_password.message")}
                </Text>
              </Box>
            </Box>
            <Button
              buttonType="primary"
              className={styles.form_1_button}
              onClick={formForm1.handleSubmit(handleForm1Button)}
            >
              <Text className={styles.form_1_text_0} textType="Text">
                {t("login_user.form_1_text_0")}
              </Text>
            </Button>
            <Box className={styles.box_7}>
              <Text className={styles.text_5} textType="Text">
                {t("login_user.text_5")}
              </Text>
              <Text
                href={"/NewUser/sign-up"}
                className={styles.text_register}
                textType="Link"
              >
                {t("login_user.text_6")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default LoginUserPage;
