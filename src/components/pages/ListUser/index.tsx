/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import HeroSection from "@components/molecules/HeroSection";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrayElement } from "@utils/array";
import Image from "next/future/image";
import FooterSection from "@components/molecules/FooterSection";
import assets from "@assets/index";
import { useUserService } from "@services/user";
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
type ListUserPageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form1FormData {
  input_1: string;
}
function ListUserPage(props: ListUserPageProps): JSX.Element {
  const userService = useUserService();
  const getApiUsersInstance = userService.useGetApiUsers();
  const getApiUsersResult = getApiUsersInstance.useQuery();
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
      { path: "username", name: "Username", sortable: false },
      { path: "email", name: "Email", sortable: false },
      { path: "dateofbirth", name: "Dateofbirth", sortable: false },
      { path: "isactive", name: "Isactive", sortable: false },
    ],
    []
  );

  const handleButton1 = async (values?: Form1FormData) => {
    try {
      const responseGetApiUsers = await getApiUsersInstance.fetch();
    } catch (e: unknown) {}
  };
  return (
    <Page className={styles.page_container}>
      <HeroSection className={styles.herosection_1} />
      <Box className={styles.wrapper11}>
        <Box className={styles.input_1_container}>
          <Box className={styles.header_wrapper5}>
            <Text className={styles.text4} textType="Text">
              Party user
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
                    placeholder={"Input name"}
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
            data={get(getApiUsersResult, "data.users")}
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
      <Box className={styles.box_1}>
        <Image
          src={assets("1686622898337png")}
          alt={""}
          className={styles.image_1}
        />
        <Image
          src={assets("1686622898751png")}
          alt={""}
          className={styles.image_0}
        />
      </Box>
      <FooterSection className={styles.footersection_1} />
    </Page>
  );
}
export default ListUserPage;
