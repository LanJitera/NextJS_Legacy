/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import HeroSection from "@components/molecules/HeroSection";
import Image from "next/future/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import assets from "@assets/index";
import { useTranslation } from "next-i18next";
import CardItem from "@components/molecules/CardItem";
import { usePartyService } from "@services/party";
import { useNavigateService } from "@services/navigate";
import {
  Page,
  Box,
  Text,
  Input,
  DateTimePicker,
  Button,
  List,
} from "@jitera/jitera-web-ui-library";
import dateFormat, { masks } from "dateformat";
import styles from "./styles.module.css";
import PaginatedItems from "@components/molecules/PaginatedItems";

type HomePageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Form0FormData {
  input_SearchName: string;
  input_SearchAddress: string;
  datetimepicker_1: string;
}

function HomePage(props: HomePageProps): JSX.Element {
  const { t } = useTranslation("web");
  const partyService = usePartyService();
  const getApiPartiesInstance = partyService.useGetApiParties();
  const getApiPartiesResult = getApiPartiesInstance.useQuery({
    parties: { isstatus: "Public" },
  });
  const navigateService = useNavigateService();
  const validationForm0Schema = useMemo(() => yup.object().shape({}), []);

  const formForm0 = useForm<Form0FormData>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: yupResolver(validationForm0Schema),
    shouldFocusError: true,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { errors: formForm0Errors } = formForm0.formState;

  useEffect(() => {
    formForm0.reset({});
  }, []);

  const handleButton1 = async (values?: Form0FormData) => {
    try {
      const datetime = get(values, "datetimepicker_1._d", "");
      const formattedDate =
        datetime !== ""
          ? dateFormat(get(values, "datetimepicker_1._d", ""), "yyyy-mm-dd")
          : undefined;
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          nameparty: get(values, "input_SearchName", ""),
          partylocation: get(values, "input_SearchAddress", ""),
          partystarttime: formattedDate,
          isstatus: "Public",
        },
      });
    } catch (e: unknown) {}
  };

  const handleOnPressList1Item = async (Id?: number, index?: number) => {
    try {
      navigateService.navigate(`/User/party-detail/${Id}`);
    } catch (e: unknown) {}
  };
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    setDataSource(getApiPartiesResult?.data?.parties);
  }, [getApiPartiesResult?.data?.parties]);
  const currentDate = new Date();
  const handlePartyHappenning = async (values?: Form0FormData) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          isstatus: "Public",
        },
      });
      const filteredParties = responseGetApiParties?.parties.filter((party) => {
        const partyStartTime = new Date(party.partystarttime);
        const isSameDate =
          partyStartTime.getDate() === currentDate.getDate() &&
          partyStartTime.getMonth() === currentDate.getMonth() &&
          partyStartTime.getFullYear() === currentDate.getFullYear();
        return isSameDate;
      });
      setDataSource(filteredParties);
    } catch (e: unknown) {}
  };
  const handleAllListParty = async (values?: Form0FormData) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          isstatus: "Public",
        },
      });
      setDataSource(responseGetApiParties?.parties);
    } catch (e: unknown) {}
  };
  const handlePartyUpcoming = async (values?: Form0FormData) => {
    try {
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          isstatus: "Public",
        },
      });
      const filteredParties = responseGetApiParties?.parties.filter((party) => {
        const partyStartTime = new Date(party.partystarttime);
        const isSameDate = partyStartTime > currentDate;
        return isSameDate;
      });
      setDataSource(filteredParties);
    } catch (e: unknown) {}
  };

  //  paginate

  return (
    <Page className={styles.page_container}>
      <Box className={styles.box_2}>
        <HeroSection className={styles.herosection_1} />
        <Box className={styles.box_12}>
          <Image
            src={assets("1686621805569png")}
            alt={""}
            className={styles.image_4}
          />
          <Image
            src={assets("1686621806021png")}
            alt={""}
            className={styles.image_5}
          />
          <Box className={styles.box_13}>
            <Box className={styles.box_14}>
              <Text className={styles.text_4} textType="Text">
                {t("home.text_4")}
              </Text>
              <Text className={styles.text_5} textType="Text">
                {/* Khám phá các hoạt động và địa điểm tham quan mới theo sở thích và gu du lịch của bạn
              Tham gia các buổi tiệc hoành tráng nhất  */}
              </Text>
            </Box>
            <Box className={styles.box_1}>
              <Box className={styles.form_0}>
                <Box className={styles.box_76}>
                  <Controller
                    control={formForm0.control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { isTouched, error },
                    }: any) => {
                      return (
                        <Input
                          inputStyle={styles.input_search_name_input}
                          placeholder={t("home.input_1")}
                          className={styles.input_search_name}
                          onChange={onChange}
                          value={value}
                        />
                      );
                    }}
                    name="input_SearchName"
                  />
                </Box>
                <Box className={styles.box_77}>
                  <Controller
                    control={formForm0.control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { isTouched, error },
                    }: any) => {
                      return (
                        <Input
                          inputStyle={styles.input_search_address_input}
                          placeholder={t("home.input_0")}
                          className={styles.input_search_address}
                          onChange={onChange}
                          value={value}
                        />
                      );
                    }}
                    name="input_SearchAddress"
                  />
                </Box>
                <Box className={styles.box_78}>
                  <Box className={styles.datetimepicker_1_container}>
                    <Controller
                      control={formForm0?.control}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { isTouched, error },
                      }: any) => {
                        return (
                          <DateTimePicker
                            format="yyyy-MM-dd"
                            picker="date"
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
                <Button
                  buttonType="primary"
                  className={styles.button_1}
                  onClick={formForm0.handleSubmit(handleButton1)}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.box_41}>
        <Box className={styles.box_55}>
          <Box className={styles.box_56}>
            <Box className={styles.box_57}>
              <Button
                buttonType="primary"
                className={styles.button_3}
                onClick={formForm0.handleSubmit(handleAllListParty)}
              >
                <Text className={styles.button_3_text_0} textType="Text">
                  Tất cả bửa tiệc
                </Text>
              </Button>
              <Button
                buttonType="primary"
                className={styles.button_3}
                onClick={formForm0.handleSubmit(handlePartyHappenning)}
              >
                <Text className={styles.button_3_text_0} textType="Text">
                  {t("home.button_3_text_0")}
                </Text>
              </Button>
              <Button
                buttonType="primary"
                className={styles.button_4}
                onClick={formForm0.handleSubmit(handlePartyUpcoming)}
              >
                <Text className={styles.button_4_text_0} textType="Text">
                  {t("home.button_4_text_0")}
                </Text>
              </Button>
            </Box>
          </Box>
          <Box className={styles.box_59}>
            {/* <List
              className={styles.ListAll}
              // dataSource={getApiPartiesResult?.data?.parties}
              dataSource={dataSource}
              rowKey={useCallback(
                (item: Record<string, any>) => `${item.id}_${item.created_at}`,
                []
              )}
              grid={{ gutter: 0, xs: 3, md: 3, xl: 3, xxl: 4 }}
              renderItem={useCallback(
                (item: any) => (
                  <CardItem
                    className={styles.test}
                    nameParty={item.nameparty}
                    partystarttime={dateFormat(
                      item.partystarttime,
                      "paddedShortDate"
                    )}
                    partyLocation={item.partylocation}
                    decribe={item.describe}
                    // img={item.describe}
                    img={item.img}
                    label={"Booking"}
                    onPress={handleOnPressList1Item}
                    Id={item.id}
                  />
                ),
                [getApiPartiesResult]
              )}
            /> */}
          </Box>
          <PaginatedItems
            handleOnPressList1Item={handleOnPressList1Item}
            getApiPartiesResult={getApiPartiesResult}
            test={dataSource}
            itemsPerPage={4}
          />
        </Box>
        <Box className={styles.box_33}>
          <Box className={styles.box_3}>
            <Box className={styles.box_4}>
              <Text className={styles.text_1} textType="Text">
                {t("home.text_1")}
              </Text>
            </Box>
          </Box>
          <Box className={styles.box_38}>
            <Box className={styles.box_39}>
              <Box className={styles.box_40}>
                <Image
                  src={assets("1686621806353png")}
                  alt={""}
                  className={styles.image_9}
                />
                <Box className={styles.box_41}>
                  <Text className={styles.text_17} textType="Text">
                    Paris
                  </Text>
                  <Box className={styles.box_42}>
                    <Text className={styles.text_18} textType="Text">
                      $699
                    </Text>
                    <Text className={styles.text_19} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.box_43}>
              <Box className={styles.box_44}>
                <Image
                  src={assets("1686621806424png")}
                  alt={""}
                  className={styles.image_10}
                />
                <Box className={styles.box_45}>
                  <Text className={styles.text_20} textType="Text">
                    Greece
                  </Text>
                  <Box className={styles.box_46}>
                    <Text className={styles.text_21} textType="Text">
                      $1079
                    </Text>
                    <Text className={styles.text_22} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.box_47}>
              <Box className={styles.box_48}>
                <Image
                  src={assets("1686621806490png")}
                  alt={""}
                  className={styles.image_11}
                />
                <Box className={styles.box_49}>
                  <Text className={styles.text_23} textType="Text">
                    Norway
                  </Text>
                  <Box className={styles.box_50}>
                    <Text className={styles.text_24} textType="Text">
                      $895
                    </Text>
                    <Text className={styles.text_25} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.box_51}>
              <Box className={styles.box_52}>
                <Image
                  src={assets("1686621806559png")}
                  alt={""}
                  className={styles.image_12}
                />
                <Box className={styles.box_53}>
                  <Text className={styles.text_26} textType="Text">
                    Tuscany
                  </Text>
                  <Box className={styles.box_54}>
                    <Text className={styles.text_27} textType="Text">
                      $1245
                    </Text>
                    <Text className={styles.text_28} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.box_106}>
        <Box className={styles.box_14_footer}>
          <Box className={styles.box_15}>
            <Box className={styles.box_16}>
              <Image
                src={assets("1686630477484logogmopng")}
                alt={""}
                className={styles.image_0}
              />
            </Box>
            <Text className={styles.text_5} textType="Text">
              Fickle Flight is your one-stop travel portal. We offer hassle free
              flight and hotel bookings. We also have all your flight needs in
              you online shop.
            </Text>
            <Box className={styles.box_17}>
              <Box className={styles.box_18}>
                <Image
                  src={assets("1686621807407svg")}
                  alt={""}
                  className={styles.image_2}
                />
              </Box>
              <Box className={styles.box_19}>
                <Image
                  src={assets("1686621807409svg")}
                  alt={""}
                  className={styles.image_3}
                />
              </Box>
              <Box className={styles.box_20}>
                <Image
                  src={assets("1686621807413svg")}
                  alt={""}
                  className={styles.image_4}
                />
              </Box>
            </Box>
          </Box>
          <Box className={styles.box_21} />
          <Box className={styles.box_22}>
            <Box className={styles.box_23}>
              <Text className={styles.text_6} textType="Text">
                About Us
              </Text>
              <Text className={styles.text_7} textType="Text">
                Company
              </Text>
              <Text className={styles.text_8} textType="Text">
                News
              </Text>
              <Text className={styles.text_9} textType="Text">
                Careers
              </Text>
              <Text className={styles.text_10} textType="Text">
                How we work
              </Text>
            </Box>
            <Box className={styles.box_24}>
              <Text className={styles.text_11} textType="Text">
                Account
              </Text>
              <Text className={styles.text_12} textType="Text">
                Support
              </Text>
              <Text className={styles.text_13} textType="Text">
                Support Center
              </Text>
              <Text className={styles.text_14} textType="Text">
                FAQ
              </Text>
              <Text className={styles.text_15} textType="Text">
                Accessibility
              </Text>
            </Box>
            <Box className={styles.box_25}>
              <Text className={styles.text_16} textType="Text">
                Covid Advisory
              </Text>
              <Text className={styles.text_17} textType="Text">
                More
              </Text>
              <Text className={styles.text_18} textType="Text">
                Airline Fees
              </Text>
              <Text className={styles.text_19} textType="Text">
                Tips
              </Text>
              <Text className={styles.text_20} textType="Text">
                Quarantine Rules
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default HomePage;
