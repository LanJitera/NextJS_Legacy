/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect, useState } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DashboardNavbar from "@components/molecules/DashboardNavbar";
import DashboardSidebar from "@components/molecules/DashboardSidebar";
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
import axios from "axios";
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
function DashboardPartiesDetailPage(
  props: DashboardPartiesDetailPageProps
): JSX.Element {
  const { t } = useTranslation("web");
  const partyService = usePartyService();
  const getApiPartiesIdInstance = partyService.useGetApiPartiesId();
  // const getApiPartiesIdResult = getApiPartiesIdInstance.useQuery({
  //   id: get(props, "query.partyId"),
  // });
  let getApiPartiesIdResult: any;
  if (props?.partyId !== "undefined") {
    getApiPartiesIdResult = getApiPartiesIdInstance.useQuery({
      id: get(props, "query.partyId"),
    });
  }
  const navigateService = useNavigateService();
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        input_NameParty: yup
          .string()
          .required("input_NameParty is a required field"),
        Input_Desc: yup
          .string()
          .max(
            200,
            (messageParams) => `Please enter a description less than 200 words`
          ),
        input_PartyLocation: yup
          .string()
          .required("input_PartyLocation is a required field"),
        // input_NumberOfPeople: yup
        //   .number()
        //   .required("input_NumberOfPeople is a required field"),
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
    if (props?.query?.partyId === "undefined") {
      formForm1.reset({});
    } else {
      formForm1.setValue(
        "input_NameParty",
        getApiPartiesIdResult?.data?.party?.nameparty
      );
      formForm1.setValue(
        "Input_Desc",
        getApiPartiesIdResult?.data?.party?.describe
      );
      formForm1.setValue(
        "datetimepicker_1",
        getApiPartiesIdResult?.data?.party?.partystarttime
      );
      formForm1.setValue(
        "input_PartyLocation",
        getApiPartiesIdResult?.data?.party?.partylocation
      );
      formForm1.setValue(
        "input_NumberOfPeople",
        getApiPartiesIdResult?.data?.party?.numberofpeople
      );
      formForm1.setValue(
        "input_Age",
        getApiPartiesIdResult?.data?.party?.requiredage
      );
      formForm1.setValue(
        "radio_0",
        getApiPartiesIdResult?.data?.party?.isstatus
      );
    }
  }, [
    props?.query?.partyId,
    getApiPartiesIdResult?.isSuccess,
    getApiPartiesIdResult?.data,
  ]);

  const handleButton2 = async () => {
    try {
      navigateService.goBack();
    } catch (e: unknown) {}
  };

  const handleImagepicker1Text0 = async (values?: Form1FormData) => {
    // TODO: handle logic
  };

  const handleCreateParty = async (values?: Form1FormData) => {
    try {
      const responsePutApiPartiesId = await partyService.postApiParties.fetch({
        parties: {
          nameparty: get(values, "input_NameParty", ""),
          partystarttime: get(values, "datetimepicker_1", ""),
          partylocation: get(values, "input_PartyLocation", ""),
          numberofpeople: "",
          isstatus: get(values, "radio_0", ""),
          admin_id: props?.session?.user?.authenticatedId,
          describe: get(values, "Input_Desc", ""),
          requiredage: get(values, "input_Age", ""),
          // img: get(values, "imagepicker_1", ""),
        },
      });
      Toast.success("Cập nhật thành công" || "");
      navigateService.navigate("/newAdmin/dashboard/parties");
    } catch (e: unknown) {
      Toast.error("Cập nhật thất bại" || "");
    }
  };
  const handleEditParty = async (values?: Form1FormData) => {
    try {
      const responsePutApiPartiesId = await partyService.putApiPartiesId.fetch({
        id: get(props, "query.partyId"),
        parties: {
          nameparty: get(values, "input_NameParty", ""),
          partystarttime: get(values, "datetimepicker_1", ""),
          partylocation: get(values, "input_PartyLocation", ""),
          numberofpeople: "",
          isstatus: get(values, "radio_0", ""),
          admin_id: props?.session?.user?.authenticatedId,
          describe: get(values, "Input_Desc", ""),
          requiredage: get(values, "input_Age", ""),
          img: image,
        },
      });
      Toast.success("Cập nhật thành công" || "");
      navigateService.navigate("/newAdmin/dashboard/parties");
    } catch (e: unknown) {
      Toast.error("Cập nhật thất bại" || "");
    }
  };
  const preset_key = "lrgmqsss";
  const cloud_name = "dxllxabkj";
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(getApiPartiesIdResult?.data?.party?.img);
  }, [getApiPartiesIdResult?.data?.party?.img]);

  function handleFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err));
  }

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
                  </Box>
                </Box>
                <Box className={styles.MainDetail}>
                  <Box className={styles.dashboard_content_filter_table}>
                    <Box className={styles.box_1}>
                      <Box className={styles.box_4}>
                        <Row
                          align="top"
                          gutter={[30, 30]}
                          justify="start"
                          className={styles.row_0}
                        >
                          <Col md={Number(24)} xl={Number(24)} xs={Number(24)}>
                            <Box className={styles.form_1}>
                              <Box className={styles.box_5}>
                                <Box className={styles.box_6}>
                                  <Text
                                    className={styles.text_name_party}
                                    textType="Text"
                                  >
                                    {/* {t("dashboard_parties_detail.text_nameparty")} */}
                                    Name party
                                  </Text>
                                  <Text
                                    className={styles.text_2}
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
                                      <Input
                                        inputStyle={
                                          styles.input_name_party_input
                                        }
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
                                  <Text
                                    className={styles.text_3}
                                    textType="Text"
                                  >
                                    {get(
                                      formForm1Errors,
                                      "input_NameParty.message"
                                    )}
                                  </Text>
                                </Box>
                              </Box>
                              <Box className={styles.box_8}>
                                <Box className={styles.box_9}>
                                  <Text
                                    className={styles.text_describe}
                                    textType="Text"
                                  >
                                    {/* {t("dashboard_parties_detail.text_4")} */}
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
                                        inputStyle={styles.input_desc_input}
                                        // placeholder={t("dashboard_parties_detail.input_desc")}
                                        placeholder="Input describe"
                                        className={styles.input_desc}
                                        onChange={onChange}
                                        value={value}
                                      />
                                    );
                                  }}
                                  name="Input_Desc"
                                />
                                <Box className={styles.box_10}>
                                  <Text
                                    className={styles.text_5}
                                    textType="Text"
                                  >
                                    {get(formForm1Errors, "Input_Desc.message")}
                                  </Text>
                                </Box>
                              </Box>
                              <Box className={styles.box_11}>
                                <Box className={styles.box_12}>
                                  <Box className={styles.box_13}>
                                    <Box className={styles.box_14}>
                                      <Text
                                        className={styles.text_party_start_time}
                                        textType="Text"
                                      >
                                        {/* {t("dashboard_parties_detail.text_6")} */}
                                        Party start time
                                      </Text>
                                      <Text
                                        className={styles.text_7}
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
                                  <Text
                                    className={styles.text_8}
                                    textType="Text"
                                  >
                                    {get(
                                      formForm1Errors,
                                      "datetimepicker_1.message"
                                    )}
                                  </Text>
                                </Box>
                              </Box>
                              <Box className={styles.box_16}>
                                <Box className={styles.box_17}>
                                  <Text
                                    className={styles.text_party_location}
                                    textType="Text"
                                  >
                                    Party location
                                  </Text>
                                  <Text
                                    className={styles.text_11}
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
                                      <Input
                                        inputStyle={
                                          styles.input_party_location_input
                                        }
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
                                  <Text
                                    className={styles.text_12}
                                    textType="Text"
                                  >
                                    {get(
                                      formForm1Errors,
                                      "input_PartyLocation.message"
                                    )}
                                  </Text>
                                </Box>
                              </Box>
                              {/* <Box className={styles.box_19}>
                                <Box className={styles.box_20}>
                                  <Text
                                    className={styles.text_number_of_people}
                                    textType="Text"
                                  >
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
                                        inputStyle={
                                          styles.input_number_of_people_input
                                        }
                                        // placeholder={t("dashboard_parties_detail.input_3")}
                                        placeholder="Please input number of people"
                                        className={
                                          styles.input_number_of_people
                                        }
                                        onChange={onChange}
                                        value={value}
                                      />
                                    );
                                  }}
                                  name="input_NumberOfPeople"
                                />
                                <Box className={styles.box_21}>
                                  <Text
                                    className={styles.text_14}
                                    textType="Text"
                                  >
                                    {get(
                                      formForm1Errors,
                                      "input_NumberOfPeople.message"
                                    )}
                                  </Text>
                                </Box>
                              </Box> */}
                              <Box className={styles.box_22}>
                                <Box className={styles.box_23}>
                                  <Text
                                    className={styles.text_required_age}
                                    textType="Text"
                                  >
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
                                    <Text
                                      className={styles.imagepicker_1_label}
                                      textType="Text"
                                    >
                                      {/* {t("dashboard_parties_detail.imagepicker_1_label")} */}
                                      Img
                                    </Text>
                                    <Text
                                      className={styles.imagepicker_1_required}
                                      textType="Text"
                                    >
                                      *
                                    </Text>
                                  </Box>
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={handleFile}
                                  ></input>
                                </Box>
                              </Box>
                              <Box className={styles.box_26}>
                                <Box className={styles.box_27}>
                                  <Box className={styles.box_28}>
                                    <Text
                                      className={styles.text_17}
                                      textType="Text"
                                    >
                                      Status
                                    </Text>
                                    <Text
                                      className={styles.text_18}
                                      textType="Text"
                                    >
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
                                          { value: "Public", label: "Public" },
                                          {
                                            value: "Private",
                                            label: "Private",
                                          },
                                          { value: "Draft", label: "Draft" },
                                          { value: "Close", label: "Close" },
                                        ]}
                                        defaultValue={get(
                                          getApiPartiesIdResult,
                                          "data.party.describe"
                                        )}
                                        direction="horizontal"
                                        inactiveColor="#1890ff"
                                        labelStyle={{
                                          color: "#000",
                                          fontWeight: "500",
                                        }}
                                        className={styles.radio_0}
                                        onChange={onChange}
                                        value={value}
                                      />
                                    );
                                  }}
                                  name="radio_0"
                                />
                              </Box>
                              {props?.query?.partyId === "undefined" ? (
                                <CommonButton2
                                  className={styles.molecule_0}
                                  label="Create Party"
                                  onPress={formForm1.handleSubmit(
                                    handleCreateParty
                                  )}
                                />
                              ) : (
                                <CommonButton2
                                  className={styles.molecule_0}
                                  label="Edit Party"
                                  onPress={formForm1.handleSubmit(
                                    handleEditParty
                                  )}
                                />
                              )}
                            </Box>
                          </Col>
                        </Row>
                      </Box>
                    </Box>
                  </Box>
                  <Col md={Number(12)} xl={Number(8)} xs={Number(24)}>
                    <Box className={styles.images4}>
                      <img src={image} alt="" className={styles.image4} />
                    </Box>
                  </Col>
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
