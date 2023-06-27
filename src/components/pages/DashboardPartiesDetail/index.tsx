/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardNavbar from "@components/molecules/DashboardNavbar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonButton2 from "@components/molecules/CommonButton2";
import DashboardFooter from "@components/molecules/DashboardFooter";
import { useTranslation } from "next-i18next";
import { useNavigateService } from "@services/navigate";
import ModalConfirmDelete from "@components/molecules/ModalConfirmDelete";
import {
  Page,
  Box,
  Row,
  Col,
  Text,
  Button,
  Input,
  DateTimePicker,
  ImagePicker,
  Radio,
  Modal,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardPartiesDetailPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_1: string;
  input_0: string;
  datetimepicker_1: string;
  input_2: string;
  input_3: string;
  input_4: string;
  input_5: string;
  radio_0: string;
}
function DashboardPartiesDetailPage(props: DashboardPartiesDetailPageProps): JSX.Element {
  const { t } = useTranslation("web");
  const navigateService = useNavigateService();
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        input_1: yup.string().required("input_1 is a required field"),
        input_0: yup.string().required("input_0 is a required field"),
        input_2: yup.string().required("input_2 is a required field"),
        input_3: yup.string().required("input_3 is a required field"),
        input_4: yup.number().required("input_4 is a required field"),
        input_5: yup.string().required("input_5 is a required field"),
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

  const handleButton2 = async () => {
    try {
      navigateService.goBack();
    } catch (e: unknown) {}
  };
  const handleButton3 = async () => {
    try {
      Modal.show(<ModalConfirmDelete yes={handleYesButton3} No={handleNoButton3} />, {
        position: "default",
      });
    } catch (e: unknown) {}
  };
  const handleImagepicker1Button = async (values?: Form1FormData) => {
    // TODO: handle logic
  };
  const handleImagepicker1Text0 = async (values?: Form1FormData) => {
    // TODO: handle logic
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
                    Parties Detail
                  </Text>
                  <Box className={styles.box_29}>
                    <Button
                      buttonType="primary"
                      className={styles.button_2}
                      onClick={handleButton2}
                    >
                      Back
                    </Button>
                    <Button
                      buttonType="primary"
                      className={styles.button_3}
                      onClick={handleButton3}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
                <Box className={styles.dashboard_content_filter_table}>
                  <Box className={styles.box_1}>
                    <Box className={styles.box_4}>
                      <Row align="top" gutter={[30, 30]} justify="start" className={styles.row_0}>
                        <Col md={Number(24)} xl={Number(24)} xs={Number(24)}>
                          <Box className={styles.form_1}>
                            <Box className={styles.box_5}>
                              <Box className={styles.box_6}>
                                <Text className={styles.text_1} textType="Text">
                                  Party
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
                                      inputStyle={styles.input_1_input}
                                      placeholder={"Plase input party"}
                                      className={styles.input_1}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_1"
                              />
                              <Box className={styles.box_7}>
                                <Text className={styles.text_3} textType="Text">
                                  {get(formForm1Errors, "PartyName_input.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_8}>
                              <Box className={styles.box_9}>
                                <Text className={styles.text_4} textType="Text">
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
                                      inputStyle={styles.input_0_input}
                                      placeholder={"Plase input describe"}
                                      className={styles.input_0}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_0"
                              />
                              <Box className={styles.box_10}>
                                <Text className={styles.text_5} textType="Text">
                                  {get(formForm1Errors, "PartyDes_Input.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_11}>
                              <Box className={styles.box_12}>
                                <Box className={styles.box_13}>
                                  <Box className={styles.box_14}>
                                    <Text className={styles.text_6} textType="Text">
                                      Party start time
                                    </Text>
                                    <Text className={styles.text_7} textType="Text">
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
                              <Box className={styles.box_15}>
                                <Text className={styles.text_8} textType="Text">
                                  {get(formForm1Errors, "datetimepicker_1.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_16}>
                              <Box className={styles.box_17}>
                                <Text className={styles.text_10} textType="Text">
                                  Party location
                                </Text>
                                <Text className={styles.text_11} textType="Text">
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
                                      inputStyle={styles.input_2_input}
                                      placeholder={"Plase input location"}
                                      className={styles.input_2}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_2"
                              />
                              <Box className={styles.box_18}>
                                <Text className={styles.text_12} textType="Text">
                                  {get(formForm1Errors, "PartyLocation_input.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_19}>
                              <Box className={styles.box_20}>
                                <Text className={styles.text_13} textType="Text">
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
                                      inputStyle={styles.input_3_input}
                                      placeholder={"Plase input party"}
                                      className={styles.input_3}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_3"
                              />
                              <Box className={styles.box_21}>
                                <Text className={styles.text_14} textType="Text">
                                  {get(formForm1Errors, "NumberOfPeople_input.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_22}>
                              <Box className={styles.box_23}>
                                <Text className={styles.text_15} textType="Text">
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
                                      inputStyle={styles.input_4_input}
                                      placeholder={"Plase input age"}
                                      className={styles.input_4}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_4"
                              />
                              <Box className={styles.box_24}>
                                <Text className={styles.text_16} textType="Text">
                                  {get(formForm1Errors, "RequiredAge_input.message")}
                                </Text>
                              </Box>
                              <Box className={styles.box_25} />
                            </Box>
                            <Box className={styles.box_30}>
                              <Box className={styles.box_31}>
                                <Text className={styles.text_19} textType="Text">
                                  {t("dashboard_parties_detail.text_19")}
                                </Text>
                                <Text className={styles.text_20} textType="Text">
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
                                      inputStyle={styles.input_5_input}
                                      placeholder={"Plase input party"}
                                      className={styles.input_5}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_5"
                              />
                              <Box className={styles.box_32}>
                                <Text className={styles.text_21} textType="Text">
                                  {get(formForm1Errors, "PartyName_input.message")}
                                </Text>
                              </Box>
                              <Box className={styles.imagepicker_1_container}>
                                <Box className={styles.imagepicker_1_inner}>
                                  <Text className={styles.imagepicker_1_label} textType="Text">
                                    Label
                                  </Text>
                                  <Text className={styles.imagepicker_1_required} textType="Text">
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
                                      <ImagePicker
                                        maxCount={Number(1)}
                                        beforeUpload={() => {
                                          return false;
                                        }}
                                        onChange={onChange}
                                        value={value}
                                      >
                                        <Button
                                          buttonType="primary"
                                          className={styles.imagepicker_1_button}
                                          onClick={formForm1.handleSubmit(handleImagepicker1Button)}
                                        >
                                          <Text
                                            className={styles.imagepicker_1_text_0}
                                            textType="Text"
                                            onClick={formForm1.handleSubmit(
                                              handleImagepicker1Text0
                                            )}
                                          >
                                            [ImagePicker]
                                          </Text>
                                        </Button>
                                      </ImagePicker>
                                    );
                                  }}
                                  name="imagepicker_1"
                                />
                              </Box>
                            </Box>
                            <Box className={styles.box_26}>
                              <Box className={styles.box_27}>
                                <Box className={styles.box_28}>
                                  <Text className={styles.text_17} textType="Text">
                                    Status
                                  </Text>
                                  <Text className={styles.text_18} textType="Text">
                                    *
                                  </Text>
                                </Box>
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
                                      defaultValue={get(
                                        getApiPartiesIdResult,
                                        "data.party.describe"
                                      )}
                                      direction="horizontal"
                                      inactiveColor="#1890ff"
                                      labelStyle={{ color: "#000", fontWeight: "500" }}
                                      className={styles.radio_0}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="radio_0"
                              />
                            </Box>
                            <CommonButton2 className={styles.molecule_0} label="Booking" />
                          </Box>
                        </Col>
                      </Row>
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
export default DashboardPartiesDetailPage;
