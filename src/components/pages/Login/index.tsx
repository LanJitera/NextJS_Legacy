/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Background from "@components/molecules/Background";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonButton2 from "@components/molecules/CommonButton2";
import { useAuthenticationService } from "@services/authentication";
import { useNavigateService } from "@services/navigate";
import {
  Page,
  Box,
  Text,
  Col,
  Input,
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type LoginPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_email: string;
  password_input: string;
}


function LoginPage(props: LoginPageProps): JSX.Element {
  const authenticationService = useAuthenticationService();
  const navigateService = useNavigateService();
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        input_email: yup
          .string()
          .email()
          .required("input_email is a required field"),
        password_input: yup
          .string()
          .required("password_input is a required field"),
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

  const handleOnPressMolecule3 = async (values?: Form1FormData) => {
    try {
      await authenticationService.loginWithEmail("admins", {
        email: get(values, "input_email", ""),
        password: get(values, "password_input", ""),
      });
      navigateService.navigate("admin/list-party");
    } catch (e: unknown) {
      Toast.error("Login failed" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <Background className={styles.background1} />
      <Box className={styles.container7}>
        <Box className={styles.wrapper7}>
          <Text className={styles.text4} textType="Text">
            Welcome back!
          </Text>
          <Box className={styles.card7}>
            <Text className={styles.text6} textType="Text">
              Login
            </Text>
            <Box className={styles.login_form7}>
              <Col md={Number(24)} xl={Number(24)} xs={Number(24)}>
                <Box className={styles.form_1}>
                  <Box className={styles.box_5}>
                    <Box className={styles.box_6}>
                      <Text className={styles.text_1} textType="Text">
                        Email
                      </Text>
                      <Text className={styles.text_3} textType="Text">
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
                            placeholder={"Please input email"}
                            className={styles.input_email}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="input_email"
                    />
                    <Box className={styles.box_7}>
                      <Text className={styles.text_4} textType="Text">
                        {get(formForm1Errors, "input_email.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_11}>
                    <Box className={styles.box_12}>
                      <Text className={styles.text_5} textType="Text">
                        Password
                      </Text>
                      <Text className={styles.text_9} textType="Text">
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
                            inputStyle={styles.password_input_input}
                            isPasswordField
                            placeholder={"Please input password"}
                            className={styles.password_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="password_input"
                    />
                    <Box className={styles.box_13}>
                      <Text className={styles.text_10} textType="Text">
                        {get(formForm1Errors, "password_input.message")}
                      </Text>
                      <CommonButton2
                        className={styles.molecule_3}
                        label="Login"
                        onPress={formForm1.handleSubmit(handleOnPressMolecule3)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Col>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default LoginPage;
