/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import DefaultHeader from "@components/molecules/DefaultHeader";
import Background from "@components/molecules/Background";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrayElement } from "@utils/array";
import { useAuthenticationService } from "@services/authentication";
import { usePartyService } from "@services/party";
import { useNavigateService } from "@services/navigate";
import Text from "@components/molecules/Text";
import {
  Page,
  Box,
  Text,
  Button,
  Input,
  TableColumnDefinition,
  Table,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type ManagerListPartyPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_1: string;
  input_0: string;
}
function ManagerListPartyPage(props: ManagerListPartyPageProps): JSX.Element {
  const authenticationService = useAuthenticationService();
  const authenticatedDataValue = authenticationService.useAuthenticatedData("authenticatedData");
  const partyService = usePartyService();
  const getApiPartiesInstance = partyService.useGetApiParties();
  const getApiPartiesResult = getApiPartiesInstance.useQuery({
    parties: { admin_id: get(authenticatedDataValue, "id") },
  });
  const navigateService = useNavigateService();
  const validationForm1Schema = useMemo(() => yup.object().shape({}), []);
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

  const columnsTable1 = useMemo<TableColumnDefinition<any>[]>(
    () => [
      { path: "nameparty", name: "Name party", sortable: false },
      { path: "describe", name: "Describe", sortable: false },
      { path: "partystarttime", name: "Party start time", sortable: false },
      { path: "partylocation", name: "Party location", sortable: false },
      { path: "numberofpeople", name: "Number of people", sortable: false },
      { path: "isstatus", name: "Status", sortable: false },
      { path: "requiredage", name: "Requiredage", sortable: false },
    ],
    []
  );

  const actionsTable1 = useMemo<TableColumnDefinition<any>[]>(
    () => [
      {
        name: "Total Member",
        renderColumn: (props) => {
          return <Text {...props.row.original} />;
        },
      },
      {
        name: "Member",
        renderColumn: (props) => {
          return <Text {...props.row.original} />;
        },
      },
      {
        name: "Update",
        renderColumn: (props) => {
          return <Text {...props.row.original} />;
        },
      },
    ],
    []
  );

  const handleButton2 = async () => {
    try {
      navigateService.navigate("admin/createparty");
    } catch (e: unknown) {}
  };
  const handleButton1 = async (values?: Form1FormData) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          nameparty: get(values, "input_1", ""),
          partylocation: get(values, "input_0", ""),
        },
      });
    } catch (e: unknown) {}
  };
  return (
    <Page className={styles.page_container}>
      <DefaultHeader className={styles.molecule_2} />
      <Background className={styles.background1} />
      <Box className={styles.wrapper11}>
        <Box className={styles.input_1_container}>
          <Box className={styles.header_wrapper5}>
            <Text className={styles.text4} textType="Text">
              Party list
            </Text>
            <Button buttonType="primary" className={styles.button_2} onClick={handleButton2}>
              Create new party
            </Button>
          </Box>
          <Box className={styles.form_1}>
            <Controller
              control={formForm1.control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isTouched, error },
              }: any) => {
                return (
                  <Input
                    inputStyle={styles.input_1_input}
                    placeholder={"Input name party"}
                    className={styles.input_1}
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
              name="input_1"
            />

            <Controller
              control={formForm1.control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isTouched, error },
              }: any) => {
                return (
                  <Input
                    inputStyle={styles.input_0_input}
                    placeholder={"Input location"}
                    className={styles.input_0}
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
              name="input_0"
            />
            <Button
              buttonType="primary"
              className={styles.button_1}
              onClick={formForm1.handleSubmit(handleButton1)}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box className={styles.box_5}>
          <Table
            bodyColumnStyle={{
              backgroundColor: "#fff",
              borderColor: "#000",
              borderStyle: "solid",
              borderWidth: "1px",
              color: "#000",
              fontSize: "14px",
              paddingBottom: "4px",
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "4px",
              textAlign: "left",
              whiteSpace: "nowrap",
            }}
            data={get(getApiPartiesResult, "data.parties")}
            footerColumnStyle={{
              backgroundColor: "#fff",
              borderColor: "#000",
              borderStyle: "solid",
              borderWidth: "1px",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              paddingBottom: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "8px",
              textAlign: "center",
            }}
            headerColumnStyle={{
              backgroundColor: "#fff",
              borderColor: "#000",
              borderStyle: "solid",
              borderWidth: "1px",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              paddingBottom: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "8px",
              textAlign: "center",
            }}
            isHeaderVisible
            actions={actionsTable1}
            columns={columnsTable1}
            tableStyle={{
              backgroundColor: "#fff",
              borderColor: "#000",
              borderStyle: "solid",
              borderWidth: "1px",
              color: "#000",
            }}
          />
        </Box>
      </Box>
    </Page>
  );
}
export default ManagerListPartyPage;
