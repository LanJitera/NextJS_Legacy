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
import {
  Page,
  Box,
  Text,
  Col,
  Input,
  DateTimePicker,
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type SignUpAdminPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  Name_input: string;
  email_input: string;
  password_input: string;
  datetimepicker_1: string;
}
function SignUpAdminPage(props: SignUpAdminPageProps): JSX.Element {
  const authenticationService = useAuthenticationService();
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        Name_input: yup.string().required("Name_input is a required field"),
        email_input: yup.string().required("email_input is a required field"),
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

  const handleOnPressCommonButton1 = async (values?: Form1FormData) => {
    try {
      await authenticationService.signupWithEmail("admins", {
        email: get(values, "email_input", ""),
        password: get(values, "password_input", ""),
      });
    } catch (e: unknown) {
      Toast.error("Login failed" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <Box className={styles.container21}>
        <Box className={styles.home14}>
          <Box className={styles.container14}>
            <Box className={styles.wrapper14}>
              <Box className={styles.header_wrapper8}>
                <Text className={styles.text7} textType="Text">
                  Note list
                </Text>
                <Text className={styles.text8} textType="Text">
                  Create new note
                </Text>
              </Box>
              <Box className={styles.card10}>
                <Text className={styles.text10} textType="Text">
                  Init step
                </Text>
              </Box>
              <Box className={styles.card12}>
                <Text className={styles.text12} textType="Text">
                  Recommendation for next step
                </Text>
              </Box>
              <Box className={styles.card14}>
                <Text className={styles.text14} textType="Text">
                  Success_probability
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Background className={styles.background2} />
        <Box className={styles.wrapper21}>
          <Text className={styles.text16} textType="Text">
            Hello Admin
          </Text>
          <Box className={styles.card21}>
            <Text className={styles.text18} textType="Text">
              Sign up
            </Text>
            <Box className={styles.sign_up_form20}>
              <Col md={Number(24)} xl={Number(24)} xs={Number(24)}>
                <Box className={styles.form_1}>
                  <Box className={styles.box_5}>
                    <Box className={styles.box_6}>
                      <Text className={styles.text_1} textType="Text">
                        Name
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
                            inputStyle={styles.name_input_input}
                            isPasswordField
                            placeholder={"Please input password"}
                            className={styles.name_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="Name_input"
                    />
                    <Box className={styles.box_7}>
                      <Text className={styles.text_5} textType="Text">
                        {get(formForm1Errors, "Name_input.message")}
                      </Text>
                      <Text className={styles.text_6} textType="Text">
                        By registering, you agree to the privacy policy and
                        membership agreement.
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_2}>
                    <Box className={styles.box_3}>
                      <Text className={styles.text_9} textType="Text">
                        Email
                      </Text>
                      <Text className={styles.text_0} textType="Text">
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
                            inputStyle={styles.email_input_input}
                            placeholder={"Please input email"}
                            className={styles.email_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="email_input"
                    />
                    <Box className={styles.box_4}>
                      <Text className={styles.text_2} textType="Text">
                        {formForm1.getValues("email_input")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.input_2_container}>
                    <Box className={styles.input_2_inner}>
                      <Text className={styles.input_2_label} textType="Text">
                        Password
                      </Text>
                      <Text className={styles.input_2_required} textType="Text">
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
                    <Box className={styles.input_2_error_message_container}>
                      <Text
                        className={styles.input_2_error_message_text}
                        textType="Text"
                      >
                        {get(formForm1Errors, "password_input.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.datetimepicker_1_container}>
                    <Box className={styles.datetimepicker_1_inner}>
                      <Text
                        className={styles.datetimepicker_1_label}
                        textType="Text"
                      >
                        Date of birth
                      </Text>
                      <Text
                        className={styles.datetimepicker_1_required}
                        textType="Text"
                      >
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
                            /*TODO: generate error key: defaultValue*/ format="dd/MM/yyyy"
                            picker="date"
                            className={styles.datetimepicker_1}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="datetimepicker_1"
                    />
                    <Text className={styles.text_3} textType="Text">
                      {get(formForm1Errors, "datetimepicker_1.message")}
                    </Text>
                  </Box>
                  <CommonButton2
                    className={styles.common_button1}
                    label="Sign up"
                    onPress={formForm1.handleSubmit(handleOnPressCommonButton1)}
                  />
                </Box>
              </Col>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default SignUpAdminPage;
