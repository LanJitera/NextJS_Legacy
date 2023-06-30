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
import { usePartyService } from "@services/party";
import { useNavigateService } from "@services/navigate";
import ModalConfirmDelete from "@components/molecules/ModalConfirmDelete";
import { useAuthenticationService } from "@services/authentication";
import {
  Page,
  Box,
  Button,
  Row,
  Col,
  Text,
  Input,
  Radio,
  DateTimePicker,
  Modal,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type DetailPartyPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  PartyName_input: string;
  radio_0: string;
  PartyDes_Input: string;
  datetimepicker_1: string;
  PartyLocation_input: string;
  NumberOfPeople_input: string;
  RequiredAge_input: string;
  radio_1: string;
}
function DetailPartyPage(props: DetailPartyPageProps): JSX.Element {
  const partyService = usePartyService();
  const getApiPartiesIdInstance = partyService.useGetApiPartiesId();
  const getApiPartiesIdResult = getApiPartiesIdInstance.useQuery({
    id: get(props, "query.PartyId"),
  });
  const navigateService = useNavigateService();
  const authenticationService = useAuthenticationService();
  const authenticatedDataValue = authenticationService.useAuthenticatedData("authenticatedData");
  const validationForm1Schema = useMemo(
    () =>
      yup.object().shape({
        PartyName_input: yup.string().required("PartyName_input is a required field"),
        PartyDes_Input: yup.string().required("PartyDes_Input is a required field"),
        PartyLocation_input: yup.string().required("PartyLocation_input is a required field"),
        NumberOfPeople_input: yup.string().required("NumberOfPeople_input is a required field"),
        RequiredAge_input: yup.number().required("RequiredAge_input is a required field"),
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
    if (getApiPartiesIdResult.isFetched) {
      formForm1.reset({
        PartyName_input: get(getApiPartiesIdResult, "data.party.nameparty"),
        PartyDes_Input: get(getApiPartiesIdResult, "data.party.describe"),
        PartyLocation_input: get(getApiPartiesIdResult, "data.party.requiredage"),
        NumberOfPeople_input: get(getApiPartiesIdResult, "data.party.requiredage"),
      });
    }
  }, [getApiPartiesIdResult.data]);

  const handleButton1 = async () => {
    try {
      navigateService.goBack();
    } catch (e: unknown) {}
  };
  const handleButton0 = async () => {
    try {
      Modal.show(<ModalConfirmDelete yes={handleYesButton0} No={handleNoButton0} />, {
        position: "default",
      });
    } catch (e: unknown) {}
  };
  const handleOnPressMolecule3 = async (values?: Form1FormData) => {
    try {
      const responsePutApiPartiesId = await partyService.putApiPartiesId.fetch({
        id: undefined,
        parties: {
          nameparty: get(values, "PartyName_input", ""),
          describe: get(values, "PartyDes_Input", ""),
          partystarttime: get(values, "datetimepicker_1", ""),
          partylocation: get(values, "PartyLocation_input", ""),
          numberofpeople: get(values, "NumberOfPeople_input", ""),
          admin_id: get(authenticatedDataValue, "id"),
          requiredage: get(values, "RequiredAge_input", ""),
          isstatus: get(values, "radio_1", ""),
        },
      });
    } catch (e: unknown) {}
  };
  return (
    <Page className={styles.page_container}>
      <DefaultHeader className={styles.molecule_0} />
      <Background className={styles.background_1} />
      <Box className={styles.box_1}>
        <Box className={styles.box_6}>
          <Box className={styles.box_7}>
            <Button buttonType="primary" className={styles.button_1} onClick={handleButton1}>
              Back
            </Button>
            <Button buttonType="primary" className={styles.button_0} onClick={handleButton0}>
              Delete
            </Button>
          </Box>
          <Box className={styles.box_8}>
            <Row align="top" gutter={[30, 30]} justify="start" className={styles.row_1}>
              <Col md={Number(24)} xl={Number(24)} xs={Number(24)}>
                <Box className={styles.form_1}>
                  <Text className={styles.text_5} textType="Text">
                    Detail party
                  </Text>
                  <Box className={styles.box_9}>
                    <Box className={styles.box_10}>
                      <Text className={styles.text_6} textType="Text">
                        Party
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
                    <Box className={styles.box_11}>
                      <Text className={styles.text_8} textType="Text">
                        {get(formForm1Errors, "PartyName_input.message")}
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
                            className={styles.radio_0}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="radio_0"
                    />
                  </Box>
                  <Box className={styles.box_12}>
                    <Box className={styles.box_13}>
                      <Text className={styles.text_9} textType="Text">
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
                            inputStyle={styles.party_des_input_input}
                            placeholder={"Plase input describe"}
                            className={styles.party_des_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="PartyDes_Input"
                    />
                    <Box className={styles.box_14}>
                      <Text className={styles.text_10} textType="Text">
                        {get(formForm1Errors, "PartyDes_Input.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_15}>
                    <Box className={styles.box_16}>
                      <Box className={styles.box_17}>
                        <Box className={styles.box_18}>
                          <Text className={styles.text_11} textType="Text">
                            Party start time
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
                    <Box className={styles.box_19}>
                      <Text className={styles.text_13} textType="Text">
                        {get(formForm1Errors, "datetimepicker_1.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_20}>
                    <Box className={styles.box_21}>
                      <Text className={styles.text_14} textType="Text">
                        Party location
                      </Text>
                      <Text className={styles.text_15} textType="Text">
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
                    <Box className={styles.box_22}>
                      <Text className={styles.text_16} textType="Text">
                        {get(formForm1Errors, "PartyLocation_input.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_23}>
                    <Box className={styles.box_24}>
                      <Text className={styles.text_17} textType="Text">
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
                            inputStyle={styles.number_of_people_input_input}
                            placeholder={"Plase input party"}
                            className={styles.number_of_people_input}
                            onChange={onChange}
                            value={value}
                          />
                        );
                      }}
                      name="NumberOfPeople_input"
                    />
                    <Box className={styles.box_25}>
                      <Text className={styles.text_18} textType="Text">
                        {get(formForm1Errors, "NumberOfPeople_input.message")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.box_0}>
                    <Box className={styles.box_2}>
                      <Text className={styles.text_0} textType="Text">
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
                    <Box className={styles.box_3}>
                      <Text className={styles.text_1} textType="Text">
                        {get(formForm1Errors, "RequiredAge_input.message")}
                      </Text>
                    </Box>
                    <Box className={styles.box_4} />
                  </Box>
                  <Box className={styles.box_26}>
                    <Box className={styles.box_27}>
                      <Box className={styles.box_28}>
                        <Text className={styles.text_19} textType="Text">
                          Status
                        </Text>
                        <Text className={styles.text_20} textType="Text">
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
                            defaultValue={get(getApiPartiesIdResult, "data.party.describe")}
                            direction="horizontal"
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
                    className={styles.molecule_3}
                    label="Update Party"
                    onPress={formForm1.handleSubmit(handleOnPressMolecule3)}
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
export default DetailPartyPage;
