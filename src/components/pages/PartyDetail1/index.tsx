/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import HeroSection from "@components/molecules/HeroSection";
import Image from "next/future/image";
import DetailBookingParty from "@components/molecules/DetailBookingParty";
import assets from "@assets/index";
import { useForm, Controller } from "react-hook-form";
import { usePartyService } from "@services/party";
import { Page, Box, Text, Toast } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
import { useAuthenticationService } from "@services/authentication";
import { useNavigateService } from "@services/navigate";
import { usePartybookingService } from "@services/partybooking";
import { useUserService } from "@services/user";
import CommentCommon from "@components/molecules/Comment";
import CommentForm from "@components/molecules/CommentForm";
import { useCommentService } from "@services/comment";
type PartyDetail1PageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  idPartyBooker?: number;
};

interface FormComment {
  comment: string;
}

function PartyDetail1Page(props: PartyDetail1PageProps): JSX.Element {
  //call API party
  const partyService = usePartyService();
  const getApiPartiesIdInstance = partyService.useGetApiPartiesId();
  const getApiPartiesIdResult = getApiPartiesIdInstance.useQuery({
    id: props?.query?.id,
  });
  const [idPartyBooker, usePartyBooker] = useState();
  const navigateService = useNavigateService();
  //API PARTYSERVICE
  const partybookingService = usePartybookingService();
  const authenticationService = useAuthenticationService();
  const authenticatedDataValue =
    authenticationService.useAuthenticatedData("authenticatedData");

  //API COMMENT
  const commentService = useCommentService();

  //Call API USER
  const userService = useUserService();
  const getApiUsersIdInstance = userService.useGetApiUsersId();
  const [userLogin, setUserLogin] = useState("");
  const [activeComment, setActiveComment] = useState(null);
  const [dataComment, setDataComment] = useState();
  
  
  useEffect(() => {
    const handleTopHeader = async () => {
      try {
        const responseGetApiUsersId = await getApiUsersIdInstance.fetch({
          id: get(authenticatedDataValue, "id"),
        });
        setUserLogin(responseGetApiUsersId);
      } catch (e: unknown) {}
    };
    handleTopHeader();
  }, []);
  const yearUser = new Date(userLogin?.user?.dateofbirth);
  let ResultYearUser = yearUser.getFullYear();
  useLayoutEffect(() => {
    const partyBookerIndex =
      getApiPartiesIdResult.data?.party?.partybookings.findIndex(
        (userID) => userID.user_id === get(authenticatedDataValue, "id")
      );
    usePartyBooker(partyBookerIndex);
  }, [
    getApiPartiesIdResult.data?.party?.partybookings,
    authenticatedDataValue,
  ]);
  const handleCreatePartyBooking = async () => {
    try {
      const responsePostApiPartybookings =
        await partybookingService.postApiPartybookings.fetch({
          partybookings: {
            user_id: get(authenticatedDataValue, "id"),
            party_id: getApiPartiesIdResult.data?.party?.id,
            status: "Unvalue",
          },
        });
      navigateService.navigate("/User/home");
    } catch (e: unknown) {
      Toast.error("Thất bại" || "");
    }
  };
  // const [isLoad,setIsLoad]= useState(false)
  // useEffect(()=>{

  // },[isLoad])
  const handleDeletePartyBooking = async () => {
    try {
      const responseDeleteApiPartybookingsId =
        await partybookingService.deleteApiPartybookingsId.fetch({
          id: get(
            getApiPartiesIdResult,
            `data.party.partybookings.[${idPartyBooker}].id`
          ),
        });
      setIsLoad(true);
      Toast.success("Huỷ thành công" || "");

      // tạm bợ tiếp tục phát triển
      navigation.reload();
    } catch (e: unknown) {
      Toast.error("Huỷ thất bại" || "");
    }
  };
  useEffect(() => {
    setDataComment(getApiPartiesIdResult?.data?.party?.comments);
  }, [getApiPartiesIdResult?.data?.party?.comments]);
  const handleAddComment = async (text) => {
    try {
      const responseCreateApiCommnet =
        await commentService.postApiComments.fetch({
          comments: {
            party_id: props?.query?.id,
            user_id: props?.session?.user?.authenticatedId,
            comment: text,
            id_cmtrep: 0,
          },
        });
        console.log(text);
        
      let newgetApiPartiesIdInstance = getApiPartiesIdInstance.fetch({
        id: props?.query?.id,
      });
    } catch (e: unknown) {
      Toast.error("Thất bại" || "");
    }
  };

  const getChildComments = (IdParent) => {
    return dataComment?.filter((item) => {
      return item.id_cmtrep === IdParent;
    });
    //  sort((a,b)=>  new Date(b.created_at).getTime() -new Date(a.created_at).getTime())
  };

  const handleDeleteComment = async (IdCommnet) => {
    try {
      const responseCreateApiCommnet =
        await commentService.deleteApiCommentsId.fetch({ id: IdCommnet });
      let newgetApiPartiesIdInstance = getApiPartiesIdInstance.fetch({
        id: props?.query?.id,
      });
    } catch (e: unknown) {
      Toast.error("Thất bại" || "");
    }
  };
  const handleReplyComment = async (text, IdComment) => {
    try {
      const responseCreateApiCommnet =
        await commentService.postApiComments.fetch({
          comments: {
            party_id: props?.query?.id,
            user_id: props?.session?.user?.authenticatedId,
            comment: text,
            id_cmtrep: IdComment,
          },
        });
      setActiveComment(null);
      let newgetApiPartiesIdInstance = getApiPartiesIdInstance.fetch({
        id: props?.query?.id,
      });
    } catch (e: unknown) {
      Toast.error("Thất bại" || "");
    }
  };
  const handleEditComment = async (text, IdComment,IdCommentParen) => {
    try {
      const responseEditApiCommnet =
        await commentService.putApiCommentsId.fetch({
          id: IdCommentParen,
          comments: {
            party_id: props?.query?.id,
            user_id: props?.session?.user?.authenticatedId,
            comment: text,
            // id_cmtrep: IdComment,
          },
        });
      setActiveComment(null);
      let newgetApiPartiesIdInstance = getApiPartiesIdInstance.fetch({
        id: props?.query?.id,
      });
    } catch (e: unknown) {
      Toast.error("Thất bại" || "");
    }
  };
  const handleCancel = ()=>{
    setActiveComment(null)
  }
  // console.log(activeComment);
  
  const isCancel = true;
  
  return (
    <Page className={styles.page_container}>
      <HeroSection className={styles.herosection_1} />
      <Box className={styles.box_2}>
        <DetailBookingParty
          {...getApiPartiesIdResult?.data?.party}
          idPartyBooker={idPartyBooker}
          handleDeletePartyBooking={handleDeletePartyBooking}
          handleCreatePartyBooking={handleCreatePartyBooking}
          ResultYearUser={ResultYearUser}
          // isLoad = {isLoad}
        />
      </Box>
      <Box className={styles.Comment_All}>
        <Text className={styles.Comment_title} textType="Text">
          COMMENT
        </Text>
        <CommentForm title="Comment" handleComment={handleAddComment} isCancel={isCancel}/>
        {dataComment
          ?.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .map((item) => {
            return (
              <div>
                {item.id_cmtrep === 0 ? (
                  <CommentCommon
                    key={item.id}
                    {...item}
                    dataComment={dataComment}
                    replies={getChildComments(item.id)}
                    handleDeleteComment={handleDeleteComment}
                    UserID={props.session.user.authenticatedId}
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    handleReplyComment={handleReplyComment}
                    handleEditComment={handleEditComment}
                    handleCancel={handleCancel}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
      </Box>

      <Box className={styles.box_3}>
        <Box className={styles.box_4}>
          <Box className={styles.box_5}>
            <Box className={styles.box_6}>
              <Image
                src={assets("1686630477484logogmopng")}
                alt={""}
                className={styles.image_1}
              />
            </Box>
            <Text className={styles.text_1} textType="Text">
              Fickle Flight is your one-stop travel portal. We offer hassle free
              flight and hotel bookings. We also have all your flight needs in
              you online shop.
            </Text>
            <Box className={styles.box_7}>
              <Box className={styles.box_8}>
                <Image
                  src={assets("1686621807407svg")}
                  alt={""}
                  className={styles.image_6}
                />
              </Box>
              <Box className={styles.box_9}>
                <Image
                  src={assets("1686621807409svg")}
                  alt={""}
                  className={styles.image_7}
                />
              </Box>
              <Box className={styles.box_10}>
                <Image
                  src={assets("1686621807413svg")}
                  alt={""}
                  className={styles.image_8}
                />
              </Box>
            </Box>
          </Box>
          <Box className={styles.box_11} />
          <Box className={styles.box_26}>
            <Box className={styles.box_27}>
              <Text className={styles.text_2} textType="Text">
                About Us
              </Text>
              <Text className={styles.text_3} textType="Text">
                Company
              </Text>
              <Text className={styles.text_29} textType="Text">
                News
              </Text>
              <Text className={styles.text_30} textType="Text">
                Careers
              </Text>
              <Text className={styles.text_31} textType="Text">
                How we work
              </Text>
            </Box>
            <Box className={styles.box_28}>
              <Text className={styles.text_32} textType="Text">
                Account
              </Text>
              <Text className={styles.text_33} textType="Text">
                Support
              </Text>
              <Text className={styles.text_34} textType="Text">
                Support Center
              </Text>
              <Text className={styles.text_35} textType="Text">
                FAQ
              </Text>
              <Text className={styles.text_36} textType="Text">
                Accessibility
              </Text>
            </Box>
            <Box className={styles.box_29}>
              <Text className={styles.text_37} textType="Text">
                Covid Advisory
              </Text>
              <Text className={styles.text_38} textType="Text">
                More
              </Text>
              <Text className={styles.text_39} textType="Text">
                Airline Fees
              </Text>
              <Text className={styles.text_43} textType="Text">
                Tips
              </Text>
              <Text className={styles.text_44} textType="Text">
                Quarantine Rules
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default PartyDetail1Page;
