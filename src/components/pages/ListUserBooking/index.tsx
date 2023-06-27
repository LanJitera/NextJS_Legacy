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
import { usePartybookingService } from "@services/partybooking";
import Tick from "@components/molecules/Tick";
import {
  Page,
  Box,
  Text,
  Input,
  Button,
  TableColumnDefinition,
  Table,
} from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type ListUserBookingPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_1: string;
}
function ListUserBookingPage(props: ListUserBookingPageProps): JSX.Element {
  const partybookingService = usePartybookingService();
  const getApiPartybookingsInstance = partybookingService.useGetApiPartybookings();
  const getApiPartybookingsResult = getApiPartybookingsInstance.useQuery();
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
      { path: "user_id", name: "User Id", sortable: false },
      { path: "updated_at", name: "Updated At", sortable: false },
      { path: "status", name: "Status", sortable: false },
    ],
    []
  );

  const actionsTable1 = useMemo<TableColumnDefinition<any>[]>(
    () => [
      {
        name: "Status2",
        renderColumn: (props) => {
          return <Tick {...props.row.original} />;
        },
      },
    ],
    []
  );

  const handleButton1 = async (values?: Form1FormData) => {
    try {
      const responseGetApiPartybookings = await getApiPartybookingsInstance.fetch({
        partybookings: { user_id: "[text]" },
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
              List of registered users
            </Text>
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
                    placeholder={"Plase input name"}
                    className={styles.input_1}
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
              name="input_1"
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
            data={get(getApiPartybookingsResult, "data.partybookings")}
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
export default ListUserBookingPage;
