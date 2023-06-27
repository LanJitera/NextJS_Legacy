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
import { usePartyService } from "@services/party";
import { useNavigateService } from "@services/navigate";
import { Modal as NewModal } from "../../../../libraries/jitera-web-ui-library/src/components/atoms/Modal/Modal.component";
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
  Toast,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DashboardPartiesDetailPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_NameParty: string;
  Input_Desc: string;
  datetimepicker_1: string;
  input_PartyLocation: string;
  input_NumberOfPeople: string;
  input_Age: string;
  radio_0: string;
}
function DashboardPartiesDetailPage(props: DashboardPartiesDetailPageProps): JSX.Element {
  const { t } = useTranslation("web");
  const partyService = usePartyService();
  const getApiPartiesIdInstance = partyService.useGetApiPartiesId();
  const getApiPartiesIdResult = getApiPartiesIdInstance.useQuery({
    id: get(props, "query.IdParty"),
  });
  const navigateService = useNavigateService();
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        input_NameParty: yup.string().required("input_NameParty is a required field"),
        Input_Desc: yup.string().required("Input_Desc is a required field"),
        input_PartyLocation: yup.string().required("input_PartyLocation is a required field"),
        input_NumberOfPeople: yup.number().required("input_NumberOfPeople is a required field"),
        input_Age: yup.number().required("input_Age is a required field"),
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
  // const handleButton3 = async () => {
  //   try {
  //     Modal.show(
  //       <Modal
  //         onYes={handleOnYesButton3}
  //         onNo={handleOnNoButton3}
  //         labelMain="Bạn có muốn xoá ?"
  //         labelDec
  //         id
  //       />,
  //       { position: "default" }
  //     );
  //   } catch (e: unknown) {}
  // };
  const handleImagepicker1Text0 = async (values?: Form1FormData) => {
    // TODO: handle logic
  };
  const handleOnPressMolecule0 = async (values?: Form1FormData) => {
    try {
      const formData = new FormData();
      formData.append("id", get(props, "query.IdParty"));
      formData.append("parties[nameparty]", get(values, "input_NameParty", ""));
      formData.append("parties[describe]", get(values, "Input_Desc", ""));
      formData.append("parties[partystarttime]", get(values, "datetimepicker_1", ""));
      formData.append("parties[partylocation]", get(values, "input_PartyLocation", ""));
      formData.append("parties[numberofpeople]", get(values, "input_NumberOfPeople", ""));
      formData.append("parties[requiredage]", get(values, "input_Age", ""));
      formData.append("parties[isstatus]", get(values, "radio_0", ""));
      formData.append("parties[img]", get(values, "imagepicker_1", ""));
      const responsePutApiPartiesId = await partyService.putApiPartiesId.fetch(formData);
      navigateService.navigate("/newAdmin/dashboard/parties");
    } catch (e: unknown) {
      Toast.error("Cập nhật thất bại" || "");
    }
  };
  return (
    <Page className={styles.page_container}>
      <DashboardNavbar className={styles.dashboardnavbar_1} />
      {/* <Box className={styles.dashboard_main}>
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
                                <Text className={styles.text_name_party} textType="Text">
                                  {t("dashboard_parties_detail.text_nameparty")}
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
                                      inputStyle={styles.input_name_party_input}
                                      placeholder={"Plase input party"}
                                      className={styles.input_name_party}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_NameParty"
                              />
                              <Box className={styles.box_7}>
                                <Text className={styles.text_3} textType="Text">
                                  {get(formForm1Errors, "input_NameParty.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_8}>
                              <Box className={styles.box_9}>
                                <Text className={styles.text_describe} textType="Text">
                                  {t("dashboard_parties_detail.text_4")}
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
                                      inputStyle={styles.input_desc_input}
                                      placeholder={t("dashboard_parties_detail.input_desc")}
                                      className={styles.input_desc}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="Input_Desc"
                              />
                              <Box className={styles.box_10}>
                                <Text className={styles.text_5} textType="Text">
                                  {get(formForm1Errors, "Input_Desc.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_11}>
                              <Box className={styles.box_12}>
                                <Box className={styles.box_13}>
                                  <Box className={styles.box_14}>
                                    <Text className={styles.text_party_start_time} textType="Text">
                                      {t("dashboard_parties_detail.text_6")}
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
                                
                                          format="MM/dd/yyyy"
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
                                <Text className={styles.text_party_location} textType="Text">
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
                                      inputStyle={styles.input_party_location_input}
                                      placeholder={"Plase input location"}
                                      className={styles.input_party_location}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_PartyLocation"
                              />
                              <Box className={styles.box_18}>
                                <Text className={styles.text_12} textType="Text">
                                  {get(formForm1Errors, "input_PartyLocation.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_19}>
                              <Box className={styles.box_20}>
                                <Text className={styles.text_number_of_people} textType="Text">
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
                                      inputStyle={styles.input_number_of_people_input}
                                      placeholder={t("dashboard_parties_detail.input_3")}
                                      className={styles.input_number_of_people}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_NumberOfPeople"
                              />
                              <Box className={styles.box_21}>
                                <Text className={styles.text_14} textType="Text">
                                  {get(formForm1Errors, "input_NumberOfPeople.message")}
                                </Text>
                              </Box>
                            </Box>
                            <Box className={styles.box_22}>
                              <Box className={styles.box_23}>
                                <Text className={styles.text_required_age} textType="Text">
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
                                      inputStyle={styles.input_age_input}
                                      placeholder={"Plase input age"}
                                      className={styles.input_age}
                                      onChange={onChange}
                                      value={value}
                                    />
                                  );
                                }}
                                name="input_Age"
                              />
                              <Text className={styles.text_1} textType="Text">
                                {get(formForm1Errors, "input_Age.message")}
                              </Text>
                            </Box>
                            <Box className={styles.box_30}>
                              <Box className={styles.imagepicker_1_container}>
                                <Box className={styles.imagepicker_1_inner}>
                                  <Text className={styles.imagepicker_1_label} textType="Text">
                                    {t("dashboard_parties_detail.imagepicker_1_label")}
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
                            <CommonButton2
                              className={styles.molecule_0}
                              label="Booking"
                              onPress={formForm1.handleSubmit(handleOnPressMolecule0)}
                            />
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
      </Box> */}
      <DashboardFooter className={styles.dashboardfooter_1} />
    </Page>
  );
}
export default DashboardPartiesDetailPage;
