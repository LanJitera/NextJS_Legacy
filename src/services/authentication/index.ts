import { useMutation, UseQueryResult } from "react-query";
import get from "lodash/get";
import { useSession } from "next-auth/react";
import {
  CreatePhoneNumberSessionRequestBody,
  EmailProviderBodyRequestBody,
  VerifyPhoneNumberRequestBody,
  FacebookProviderRequestBody,
  GoogleProviderRequestBody,
  AppleProviderRequestBody,
  createPhoneNumberSession,
  TestVerifyRequestBody,
  verifyPhoneNumber,
  loginWithFacebook,
  signupWithEmail,
  loginWithGoogle,
  loginWithEmail,
  loginWithApple,
  testVerify,
  resetPasswordRequest,
  ResetPasswordRequestBody,
  ResetPasswordVerifyRequestBody,
  resetPasswordVerify,
  logout,
} from "./requests";

export type AuthenticatedInfoDataResponse =
  | (Omit<UseQueryResult, "data"> & {
      data?: any;
    })
  | Record<string, never>;
export const useAuthenticationService = () => {
  const testVerifyMutation = useMutation(testVerify);
  const createPhoneNumberSessionMutation = useMutation(
    createPhoneNumberSession
  );
  const loginWithEmailMutation = useMutation(loginWithEmail);
  const signupWithEmailMutation = useMutation(signupWithEmail);
  const loginWithAppleMutation = useMutation(loginWithApple);
  const loginWithGoogleMutation = useMutation(loginWithGoogle);
  const loginWithFacebookMutation = useMutation(loginWithFacebook);
  const verifyPhoneNumberMutation = useMutation(verifyPhoneNumber);
  const resetPasswordMutation = useMutation(resetPasswordRequest);
  const resetPasswordVerifyMutation = useMutation(resetPasswordVerify);

  return {
    useAuthenticatedData: (key?: string) => {
      const session = useSession();
      if (!session?.data?.user) {
        return;
      }
      const user = session.data.user;
      const data = {
        ...user,
        authenticatedData: {
          ...user.authenticatedData,
          id: user.authenticatedId,
        },
      };
      return key ? get(data, key) : data;
    },
    createSession: (body: CreatePhoneNumberSessionRequestBody) => {
      return createPhoneNumberSessionMutation.mutateAsync(body);
    },
    signupWithEmail: (
      table: string,
      body: Omit<EmailProviderBodyRequestBody, "table">
    ) => {
      return signupWithEmailMutation.mutateAsync({ table, ...body });
    },
    testLogin: (body: TestVerifyRequestBody) => {
      return testVerifyMutation.mutateAsync(body);
    },
    loginWithEmail: (
      table: string,
      body: Omit<EmailProviderBodyRequestBody, "table">
    ) => {
      return loginWithEmailMutation.mutateAsync({ table, ...body });
    },
    loginWithGoogle: (
      table: string,
      body: Omit<GoogleProviderRequestBody, "table">
    ) => {
      return loginWithGoogleMutation.mutateAsync({ table, ...body });
    },
    loginWithFacebook: (
      table: string,
      body: Omit<FacebookProviderRequestBody, "table">
    ) => {
      return loginWithFacebookMutation.mutateAsync({ table, ...body });
    },
    loginWithApple: (
      table: string,
      body: Omit<AppleProviderRequestBody, "table">
    ) => {
      return loginWithAppleMutation.mutateAsync({ table, ...body });
    },
    verifyPhoneNumber: (
      table: string,
      body: Omit<VerifyPhoneNumberRequestBody, "table">
    ) => {
      return verifyPhoneNumberMutation.mutateAsync({ table, ...body });
    },
    resetPassword: (
      table: string,
      body: Omit<ResetPasswordRequestBody, "table">
    ) => {
      return resetPasswordMutation.mutateAsync({ table, ...body });
    },
    resetPasswordVerify: (
      table: string,
      body: Omit<ResetPasswordVerifyRequestBody, "table">
    ) => {
      return resetPasswordVerifyMutation.mutateAsync({ table, ...body });
    },
    logout: (callbackUrl?: string) => {
      logout(callbackUrl ? { callbackUrl } : undefined);
    },
  };
};
