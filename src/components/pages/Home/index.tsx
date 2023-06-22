/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
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
import styles from "./styles.module.css";
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
  const getApiPartiesResult = getApiPartiesInstance.useQuery({ parties: { isstatus: "Public" } });
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
      const responseGetApiParties = await getApiPartiesInstance.fetch({
        parties: {
          nameparty: get(values, "input_SearchName", ""),
          partylocation: get(values, "input_SearchAddress", ""),
          partystarttime: get(values, "datetimepicker_1", ""),
        },
      });
    } catch (e: unknown) {}
  };
  const handleOnPressList1Item = async (Id?: number) => {
    try {
      navigateService.navigate("/User/party-detail/:id", {
        id: get(getApiPartiesResult, "data.parties.describe"),
      });
    } catch (e: unknown) {}
  };
  return (
    <Page className={styles.page_container}>
      <Box className={styles.box_2}>
        <HeroSection className={styles.herosection_1} />
        <Box className={styles.box_12}>
          <Image src={assets("1686621805569png")} alt={""} className={styles.image_4} />
          <Image src={assets("1686621806021png")} alt={""} className={styles.image_5} />
          <Box className={styles.box_13}>
            <Box className={styles.box_14}>
              <Text className={styles.text_4} textType="Text">
                {t("home.text_4")}
              </Text>
              <Text className={styles.text_5} textType="Text">
                Find the best destinations and the most popular stays!
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
                      control={formForm0.control}
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
              <Button buttonType="primary" className={styles.button_3}>
                <Text className={styles.button_3_text_0} textType="Text">
                  {t("home.button_3_text_0")}
                </Text>
              </Button>
              <Button buttonType="primary" className={styles.button_4}>
                <Text className={styles.button_4_text_0} textType="Text">
                  {t("home.button_4_text_0")}
                </Text>
              </Button>
            </Box>
          </Box>
          <Box className={styles.box_59}>
            <Box className={styles.box_72}>
              <Image src={assets("1686621806872png")} alt={""} className={styles.image_17} />
              <Box className={styles.box_73}>
                <Box className={styles.box_74}>
                  <Box className={styles.box_75}>
                    <Text className={styles.text_40} textType="Text">
                      {t("home.text_40")}
                    </Text>
                    <Text className={styles.text_41} textType="Text">
                      4D3N
                    </Text>
                  </Box>
                  <Text className={styles.text_42} textType="Text">
                    $789
                  </Text>
                </Box>
              </Box>
            </Box>
            <List
              dataSource={undefined}
              rowKey={useCallback(
                (item: Record<string, any>) => `${item.id}_${item.created_at}`,
                []
              )}
              grid={{ gutter: 48, xl: 4, md: 3, xs: 2 }}
              renderItem={useCallback(
                (item: any) => (
                  <CardItem
                    nameParty={get(getApiPartiesResult, "data.parties.nameparty")}
                    partystarttime={get(getApiPartiesResult, "data.parties.partystarttime")}
                    partyLocation={get(getApiPartiesResult, "data.parties.partylocation")}
                    decribe={get(getApiPartiesResult, "data.parties.describe")}
                    img={get(getApiPartiesResult, "data.parties.describe")}
                    label={"Booking"}
                    onPress={handleOnPressList1Item}
                    Id={get(getApiPartiesResult, "data.parties.id")}
                  />
                ),
                []
              )}
            />
          </Box>
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
                <Image src={assets("1686621806353png")} alt={""} className={styles.image_9} />
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
                <Image src={assets("1686621806424png")} alt={""} className={styles.image_10} />
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
                <Image src={assets("1686621806490png")} alt={""} className={styles.image_11} />
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
                <Image src={assets("1686621806559png")} alt={""} className={styles.image_12} />
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
        <Box className={styles.box_14}>
          <Box className={styles.box_15}>
            <Box className={styles.box_16}>
              <Image src={assets("1686630477484logogmopng")} alt={""} className={styles.image_0} />
            </Box>
            <Text className={styles.text_5} textType="Text">
              Fickle Flight is your one-stop travel portal. We offer hassle free flight and hotel
              bookings. We also have all your flight needs in you online shop.
            </Text>
            <Box className={styles.box_17}>
              <Box className={styles.box_18}>
                <Image src={assets("1686621807407svg")} alt={""} className={styles.image_2} />
              </Box>
              <Box className={styles.box_19}>
                <Image src={assets("1686621807409svg")} alt={""} className={styles.image_3} />
              </Box>
              <Box className={styles.box_20}>
                <Image src={assets("1686621807413svg")} alt={""} className={styles.image_4} />
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
