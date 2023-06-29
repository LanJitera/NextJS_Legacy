/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect, useState } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import assets from "@assets/index";
import { useTranslation } from "next-i18next";
import { useAuthenticationService } from "@services/authentication";
import { useUserService } from "@services/user";
import { Box, Text } from "@jitera/jitera-web-ui-library";
import { useNavigateService } from '@services/navigate';
import styles from "./styles.module.css";
type HeroSectionMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function HeroSectionMolecule(props: HeroSectionMoleculeProps): JSX.Element {
  const { t } = useTranslation("web");
  const navigation = useNavigateService()
  const authenticationService = useAuthenticationService();
  const authenticatedDataValue =
    authenticationService.useAuthenticatedData("authenticatedData");
  const userService = useUserService();
  const getApiUsersIdInstance = userService.useGetApiUsersId();
  const [userLogin, setUserLogin] = useState("");
  useEffect(() => {
    const handleTopHeader = async () => {
      try {
        const responseGetApiUsersId = await getApiUsersIdInstance.fetch({
          id: get(authenticatedDataValue, "id"),
        });
        const username = responseGetApiUsersId?.user.username;
        if (username !== undefined && username !== "") {
          setUserLogin(username);
        }
      } catch (e: unknown) {}
    };
    handleTopHeader();
  }, []);
  const handleWebscreen = () => {
    navigation.navigate('/User/home');
  };
  const handleLogOut = async () => {
    try {
      await authenticationService.logout();
    } catch (e: unknown) {}
  };
  
  
  return (
    <Box className={`${styles.page_container} ${get(props, "className")}`}>
      <Box className={styles.top_header20}>
        <Box className={styles.top_container20}>
          <Box className={styles.fickleflight_logo8}>
            <Box className={styles.symbols8}>
              <Box className={styles.webscreen8} onClick={handleWebscreen}>
                <Image
                  src={assets("1686625755503logogmopng")}
                  alt={""}
                  className={styles.image8}
                />
                <Box className={styles.group8} />
              </Box>
            </Box>
          </Box>
          <Box className={styles.navigationright20}>
            <Box className={styles.navigation_menu14}>
              <Text href={"/User/home"} className={styles.text11} textType="Link">
                {t("hero_section.text11")}
              </Text>
              <Text className={styles.text12} textType="Text">
                {t("hero_section.text12")}
              </Text>
              <Text className={styles.text13} textType="Text">
                {t("hero_section.text13")}
              </Text>
              <Text className={styles.text14} textType="Link" href={"/User/history"}>
                {t("hero_section.text14")}
              </Text>

              {userLogin !== "" ? (
                <Text
                  href={"/User/login"}
                  className={styles.text_0}
                  textType="Link"
                  onClick={handleLogOut}
                  // onClick={()=>{deleteCookie("next-auth.session-token");}}

                >
                  {t("hero_section.text_0")}
                </Text>
              ) : (
                <Text
                  href={"/User/login"}
                  className={styles.login}
                  textType="Link"
                >
                  {t("molecule_herosection")}
                </Text>
              )}

              <Text className={styles.text_8} textType="Text">
                {userLogin}
              </Text>
            </Box>
            <Box className={styles.accountsection20}>
              <Box className={styles.notificationbell19}>
                <Image
                  src={assets("1686622898324svg")}
                  alt={""}
                  className={styles.image17}
                />
                <Image
                  src={assets("1686622898327svg")}
                  alt={""}
                  className={styles.image18}
                />
                <Box className={styles.ellipse5319} />
              </Box>
              <Image
                src={assets("1686622898330png")}
                alt={""}
                className={styles.image20}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default HeroSectionMolecule;
