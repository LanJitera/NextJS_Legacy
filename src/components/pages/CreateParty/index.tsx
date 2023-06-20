/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DefaultHeader from "@components/molecules/DefaultHeader";
import Background from "@components/molecules/Background";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonButton2 from "@components/molecules/CommonButton2";
import { useNavigateService } from "@services/navigate";
import { usePartyService } from "@services/party";
import { useAuthenticationService } from "@services/authentication";
import {
  Page,
  Box,
  Button,
  Row,
  Col,
  Text,
  Input,
  DateTimePicker,
  Radio,
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type CreatePartyPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  PartyName_input: string;
  Describe_input: string;
  datetimepicker_1: string;
  PartyLocation_input: string;
  PartyofPeople_input: string;
  RequiredAge_input: string;
  radio_1: string;
}
function CreatePartyPage(props: CreatePartyPageProps): JSX.Element {
  const navigateService = useNavigateService();
  const partyService = usePartyService();
  const authenticationService = useAuthenticationService();
  const authenticatedDataValue =
    authenticationService.useAuthenticatedData("authenticatedData");
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        PartyName_input: yup
          .string()
          .required("PartyName_input is a required field"),
        Describe_input: yup
          .string()
          .required("Describe_input is a required field"),
        PartyLocation_input: yup
          .string()
          .required("PartyLocation_input is a required field"),
        PartyofPeople_input: yup
          .number()
          .required("PartyofPeople_input is a required field"),
        RequiredAge_input: yup
          .number()
          .required("RequiredAge_input is a required field"),
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

  const handleButton1 = async () => {
    try {
      navigateService.goBack();
    } catch (e: unknown) {}
  };
  const handleOnPressCommonButton1 = async (values?: Form1FormData) => {
    try {
      const responsePostApiParties = await partyService.postApiParties.fetch({
        parties: {
          admin_id: get(authenticatedDataValue, "created_at"),
          nameparty: get(values, "PartyName_input", ""),
          describe: get(values, "Describe_input", ""),
          partystarttime: get(values, "datetimepicker_1", ""),
          partylocation: undefined,
          numberofpeople: get(values, "PartyofPeople_input", ""),
          isstatus: get(values, "radio_1", ""),
          requiredage: get(values, "RequiredAge_input", ""),
        },
      });
      navigateService.goBack();
    } catch (e: unknown) {
      Toast.error("Create party failed" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <DefaultHeader className={styles.molecule_2} />
      <Background className={styles.background1} />
      <Box className={styles.container8}>
        <Box className={styles.wrapper8}>
          <Button
            buttonType="primary"
            className={styles.button_1}
            onClick={handleButton1}
          >
            Back
          </Button>
          <Box className={styles.card8}>
            <Row
              align="top"
              gutter={[30, 30]}
              justify="start"
              className={styles.row_1}
            >
              <Col md={Number(24)} xl={Number(24)} xs={Number(24)}>
                <Box className={styles.form_1}>
                  <Text className={styles.form_1_name} textType="Text">
                    Create party
                  </Text>
                  <Box className={styles.box_2}>
                    <Box className={styles.box_3}>
                      <Text className={styles.text_4} textType="Text">
                        Party
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
                            inputStyle={styles.party_name_input_input}
                            placeholder={"Plase input party"}
                            className={styles.party_name_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="PartyName_input"
                    />
                    <Box className={styles.box_4}>
                      <Text className={styles.text_2} textType="Text">
                        {get(formForm1Errors, "PartyName_input.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_5}>
                    <Box className={styles.box_6}>
                      <Text className={styles.text_3} textType="Text">
                        Describe
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
                            inputStyle={styles.describe_input_input}
                            placeholder={"Plase input describe"}
                            className={styles.describe_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="Describe_input"
                    />
                    <Box className={styles.box_7}>
                      <Text className={styles.text_5} textType="Text">
                        {get(formForm1Errors, "Describe_input.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_8}>
                    <Box className={styles.box_9}>
                      <Box className={styles.datetimepicker_1_container}>
                        <Box className={styles.datetimepicker_1_inner}>
                          <Text
                            className={styles.datetimepicker_1_label}
                            textType="Text"
                          >
                            Party start time
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
                                showTime
                                className={styles.datetimepicker_1}
                                onChange={onChange}
                                value={value}
                              />
                            );
                          }}
                          name="datetimepicker_1"
                        />
                      </Box>
                    </Box>
                    <Box className={styles.box_10}>
                      <Text className={styles.text_8} textType="Text">
                        {get(formForm1Errors, "datetimepicker_1.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_11}>
                    <Box className={styles.box_12}>
                      <Text className={styles.text_9} textType="Text">
                        Party location
                      </Text>
                      <Text className={styles.text_10} textType="Text">
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
                            inputStyle={styles.party_location_input_input}
                            placeholder={"Plase input location"}
                            className={styles.party_location_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="PartyLocation_input"
                    />
                    <Box className={styles.box_13}>
                      <Text className={styles.text_11} textType="Text">
                        {get(formForm1Errors, "PartyLocation_input.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_14}>
                    <Box className={styles.box_15}>
                      <Text className={styles.text_12} textType="Text">
                        Number of people
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
                            inputStyle={styles.partyof_people_input_input}
                            placeholder={"Plase input party"}
                            className={styles.partyof_people_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="PartyofPeople_input"
                    />
                    <Box className={styles.box_16}>
                      <Text className={styles.text_14} textType="Text">
                        {get(formForm1Errors, "PartyofPeople_input.message")}
                      </Text>
                    </Box>
                    <Box className={styles.box_17} />
                  </Box>
                  <Box className={styles.box_18}>
                    <Box className={styles.box_19}>
                      <Text className={styles.text_1} textType="Text">
                        Required age
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
                            inputStyle={styles.required_age_input_input}
                            placeholder={"Plase input age"}
                            className={styles.required_age_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="RequiredAge_input"
                    />
                    <Box className={styles.box_20}>
                      <Text className={styles.text_6} textType="Text">
                        {get(formForm1Errors, "RequiredAge_input.message")}
                      </Text>
                    </Box>
                    <Box className={styles.box_21} />
                  </Box>
                  <Box className={styles.radio_1_container}>
                    <Box className={styles.radio_1_inner}>
                      <Text className={styles.radio_1_label} textType="Text">
                        Status
                      </Text>
                      <Text className={styles.radio_1_required} textType="Text">
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
                          <Radio
                            activeColor="#1890ff"
                            data={[
                              { value: "public", label: "Public" },
                              { value: "private", label: "Private" },
                              { value: "daft", label: "Daft" },
                              { value: "close", label: "Close" },
                            ]}
                            /*TODO: generate error key: defaultValue*/ direction="horizontal"
                            inactiveColor="#1890ff"
                            labelStyle={{ color: "#000", fontWeight: "500" }}
                            className={styles.radio_1}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="radio_1"
                    />
                  </Box>
                  <CommonButton2
                    className={styles.common_button1}
                    label="Create party"
                    onPress={formForm1.handleSubmit(handleOnPressCommonButton1)}
                  />
                </Box>
              </Col>
            </Row>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default CreatePartyPage;
