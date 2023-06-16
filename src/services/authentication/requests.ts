import { serviceFetch } from "@utils/service";
import { signIn, getSession, signOut, SignOutParams } from "next-auth/react";
import pluralize from "pluralize";
import { Session } from "next-auth";
import { QueryFunctionContext } from "react-query";
import { getRoute } from "@utils/route";
import memoryStorage from "@utils/memoryStorage";
import { STORAGE_KEYS } from "@constants/storage";
import { REFRESH_TOKEN_REJECTED_ERROR } from "@constants/error";

export type NextAuthSignInResponse = {
  error: string | undefined;
  ok: boolean;
  status: number;
  url: string | null;
};

export type GetAuthenticatedInfoRequestBody = {
  id?: string;
  table?: string;
};
export const getAuthenticatedInfo = async (
  _context: QueryFunctionContext<[string, GetAuthenticatedInfoRequestBody]>
) => {
  const info = memoryStorage.getAuthenticationInfo();
  if (!info?.authenticatedId || !info.authenticatedOwner) {
    throw new Error("[Missing param]");
  }
  const table = `${info.authenticatedOwner}`.toLowerCase();
  const model = pluralize.singular(`${table}`);
  // TODO: Get current logged user here
  return serviceFetch(
    {
      url: getRoute("/api/:table\\/:id\\/", {
        table: table,
        id: info.authenticatedId,
      }),
      method: "GET",
    },
    model
  );
};

export const refreshToken = async () => {
  const result = (await getSession({
    triggerEvent: true,
    broadcast: true,
  })) as Session;
  if (result?.user?.error === REFRESH_TOKEN_REJECTED_ERROR) {
    return logout();
  } else if (!result || !result.user || result?.user?.error) {
    throw new Error(
      "refresh token error: " + result?.user?.error || "Invalid resturn"
    );
  }

  memoryStorage.setAuthenticationInfo(result);
  return { ...result.user };
};

export type TestVerifyRequestBody = {
  phone: string;
};
export const testVerify = async (body: TestVerifyRequestBody) => {
  const result = (await signIn("testVerify", {
    phone: body.phone,
    redirect: false,
  })) as unknown as NextAuthSignInResponse;
  if (!result || result.error) {
    throw new Error(result?.error || "Invalid resturn");
  }
  localStorage.setItem(STORAGE_KEYS.TOKEN_CREATED_TIME, `${Date.now()}`);
  const info = memoryStorage.getAuthenticationInfo();
  return { ...info };
};

export type CreatePhoneNumberSessionRequestBody = {
  phoneNumber: string;
};
export const createPhoneNumberSession = async (
  body: CreatePhoneNumberSessionRequestBody
) => {
  return serviceFetch({
    url: getRoute("/api/send_otp_codes"),
    method: "POST",
    data: {
      phone_number: body.phoneNumber,
    },
  });
};

export type VerifyPhoneNumberRequestBody = {
  table: string;
  phoneNumber: string;
  otpCode: string;
};
export const verifyPhoneNumber = async (body: VerifyPhoneNumberRequestBody) => {
  const result = (await signIn("verifyPhoneNumber", {
    table: body.table,
    phone_number: body.phoneNumber,
    otp_code: body.otpCode,
    redirect: false,
  })) as unknown as NextAuthSignInResponse;
  if (!result || result.error) {
    throw new Error(result?.error || "Invalid resturn");
  }
  const info = memoryStorage.getAuthenticationInfo();
  return { ...info };
};

export type EmailProviderBodyRequestBody = {
  table: string;
  email: string;
  password: string;
};
export const signupWithEmail = async (body: EmailProviderBodyRequestBody) => {
  const { table, ...rest } = body;
  const model = pluralize.singular(table);
  return serviceFetch(
    {
      url: getRoute("/api/:table\\_registrations", { table: table }),
      method: "POST",
      data: rest,
    },
    model
  );
  // TODO: can login after signup
  // .then(async (result) => {
  //   await loginWithEmail(body);
  //   return result;
  // });
};
export const loginWithEmail = async (body: EmailProviderBodyRequestBody) => {
  const result = (await signIn("emailLogin", {
    table: body.table,
    email: body.email,
    password: body.password,
    redirect: false,
  })) as unknown as NextAuthSignInResponse;
  if (!result || result.error) {
    throw new Error(result?.error || "Invalid resturn");
  }
  const info = memoryStorage.getAuthenticationInfo();
  return { ...info };
};

export type ResetPasswordRequestBody = {
  table: string;
  email: string;
};
export const resetPasswordRequest = async (body: ResetPasswordRequestBody) => {
  const model = pluralize.singular(body.table);
  return serviceFetch(
    {
      url: getRoute("/api/:table\\_reset_password_requests", {
        table: body.table,
      }),
      method: "POST",
      data: {
        email: body.email,
      },
    },
    model
  );
};
export type ResetPasswordVerifyRequestBody = {
  table: string;
  resetToken: string;
  password: string;
  passwordConfirmation: string;
};
export const resetPasswordVerify = async (
  body: ResetPasswordVerifyRequestBody
) => {
  const model = pluralize.singular(body.table);
  return serviceFetch(
    {
      url: getRoute("/api/:table\\_verify_reset_password_requests", {
        table: body.table,
      }),
      method: "POST",
      data: {
        reset_token: body.resetToken,
        password: body.password,
        password_confirmation: body.passwordConfirmation,
      },
    },
    model
  );
};

export type GoogleProviderRequestBody = {
  table: string;
  email?: string;
  access_token: string;
};
export const loginWithGoogle = async (body: GoogleProviderRequestBody) => {
  const result = (await signIn("googleLogin", {
    table: body.table,
    email: body.email,
    access_token: body.access_token,
    redirect: false,
  })) as unknown as NextAuthSignInResponse;
  if (!result || result.error) {
    throw new Error(result?.error || "Invalid resturn");
  }
  const info = memoryStorage.getAuthenticationInfo();
  return { ...info };
};

export type FacebookProviderRequestBody = {
  table: string;
  access_token: string;
  email?: string;
  phone?: string;
};
export const loginWithFacebook = async (body: FacebookProviderRequestBody) => {
  const result = (await signIn("facebookLogin", {
    table: body.table,
    email: body.email,
    phone: body.phone,
    access_token: body.access_token,
    redirect: false,
  })) as unknown as NextAuthSignInResponse;
  if (!result || result.error) {
    throw new Error(result?.error || "Invalid resturn");
  }
  const info = memoryStorage.getAuthenticationInfo();
  return { ...info };
};

export type AppleProviderRequestBody = {
  table: string;
  id_token: string;
  uid: string;
};
export const loginWithApple = async (body: AppleProviderRequestBody) => {
  const result = (await signIn("appleLogin", {
    table: body.table,
    id_token: body.id_token,
    uid: body.uid,
    redirect: false,
  })) as unknown as NextAuthSignInResponse;
  if (!result || result.error) {
    throw new Error(result?.error || "Invalid resturn");
  }
  const info = memoryStorage.getAuthenticationInfo();
  return { ...info };
};

// TODO: Handle revoke token later
export const logout = async (options?: SignOutParams) => {
  memoryStorage.clearAuthenticationInfo();
  localStorage.removeItem(STORAGE_KEYS.TOKEN_CREATED_TIME);
  await signOut(options);
};
