import axios from "axios";
import { request } from "@utils/request";
import pluralize from "pluralize";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  INVALID_RESPONSE_ERROR,
  REFRESH_TOKEN_REJECTED_ERROR,
  REJECTED_AUTHENTICATION_ERROR,
} from "@constants/error";

const AUTHENTICATION_METHODS = {
  REFRESH_TOKEN: {
    key: "refreshToken",
    credentials: {
      table: { type: "text" },
      refresh_token: { type: "text" },
    },
    endpoint: "/oauth/token",
  },
  PHONE: {
    key: "verifyPhoneNumber",
    credentials: {
      table: { type: "text" },
      phone_number: { type: "text" },
      otp_code: { type: "password" },
    },
    endpoint: "/oauth/token",
  },
  EMAIL: {
    key: "emailLogin",
    credentials: {
      table: { type: "text" },
      email: { type: "text" },
      password: { type: "password" },
    },
    endpoint: "/oauth/token",
  },
  GOOGLE: {
    key: "googleLogin",
    credentials: {
      table: { type: "text" },
      email: { type: "text" },
      access_token: { type: "password" },
    },
    endpoint: "/api/login_google_:table",
  },
  FACEBOOK: {
    key: "facebookLogin",
    credentials: {
      table: { type: "text" },
      email: { type: "text" },
      phone: { type: "text" },
      access_token: { type: "password" },
    },
    endpoint: "/api/login_facebook_:table",
  },
  APPLE: {
    key: "appleLogin",
    credentials: {
      table: { type: "text" },
      id_token: { type: "password" },
      uid: { type: "text" },
    },
    endpoint: "/api/login_apple_:table",
  },
};

const handleRefreshToken = async (refreshToken: string) => {
  try {
    const res: any = await request({
      url: AUTHENTICATION_METHODS.REFRESH_TOKEN.endpoint,
      method: "POST",
      data: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: `${process.env.NEXT_APP_CLIENT_ID}`,
        client_secret: `${process.env.NEXT_APP_CLIENT_SECRET}`,
      },
    });
    if (res.data?.access_token) {
      const tokenInfo = res.data;
      return {
        accessToken: tokenInfo.access_token,
        refreshToken: tokenInfo.refresh_token,
        tokenType: tokenInfo.token_type,
        expiresIn: tokenInfo.expires_in,
        createdAt: Date.now(),
      };
    }
    throw new Error(INVALID_RESPONSE_ERROR);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        error: REFRESH_TOKEN_REJECTED_ERROR,
      };
    }
    return {
      error: (error as { message: string })?.message,
    };
  }
};

const prepareAuthenticationFormData = (table: string) => {
  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("client_id", `${process.env.NEXT_APP_CLIENT_ID}`);
  data.append("client_secret", `${process.env.NEXT_APP_CLIENT_SECRET}`);
  data.append("scope", table);

  return data;
};

type AuthenticationResponse = {
  access_token: string;
  refresh_token?: string;
  resource_owner: string;
  resource_id: number | string;
  token_type: string;
  expires_in?: number;
  scope: string;
};
const parseAuthenticationInfo = (res: AuthenticationResponse) => {
  return {
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    authenticatedOwner: res.resource_owner,
    authenticatedId: res.resource_id,
    tokenType: res.token_type,
    expiresIn: res.expires_in,
    scope: res.scope,
    createdAt: Date.now(),
  };
};

const providers = [
  CredentialsProvider({
    id: AUTHENTICATION_METHODS.REFRESH_TOKEN.key,
    credentials: AUTHENTICATION_METHODS.REFRESH_TOKEN.credentials,
    authorize: async (credentials) => {
      if (!credentials) {
        throw new Error("Missing params");
      }
      return handleRefreshToken(credentials.refresh_token);
    },
  }),
  CredentialsProvider({
    id: AUTHENTICATION_METHODS.PHONE.key,
    credentials: AUTHENTICATION_METHODS.PHONE.credentials,
    authorize: async (credentials) => {
      try {
        if (!credentials) {
          throw new Error("Missing params");
        }
        const data = prepareAuthenticationFormData(credentials.table);
        data.append("phone_number", credentials.phone_number);
        data.append("otp_code", credentials.otp_code);

        const res: any = await request({
          url: AUTHENTICATION_METHODS.PHONE.endpoint,
          method: "POST",
          data: data,
        });
        if (res.data?.access_token) {
          return parseAuthenticationInfo(res.data);
        }
        throw new Error("Invalid response");
      } catch (e) {
        throw e;
      }
    },
  }),
  CredentialsProvider({
    id: AUTHENTICATION_METHODS.EMAIL.key,
    credentials: AUTHENTICATION_METHODS.EMAIL.credentials,
    authorize: async (credentials) => {
      try {
        if (!credentials) {
          throw new Error("Missing params");
        }

        const data = prepareAuthenticationFormData(credentials.table);
        data.append("password", credentials.password);
        data.append("email", credentials.email);

        const res = await request({
          url: AUTHENTICATION_METHODS.EMAIL.endpoint,
          method: "POST",
          data,
        });
        if (res.data?.access_token) {
          return parseAuthenticationInfo(res.data);
        }
        throw new Error(res.data?.error || "Invalid response");
      } catch (e) {
        throw e;
      }
    },
  }),
  CredentialsProvider({
    id: AUTHENTICATION_METHODS.GOOGLE.key,
    credentials: AUTHENTICATION_METHODS.GOOGLE.credentials,
    authorize: async (credentials) => {
      try {
        if (!credentials) {
          throw new Error("Missing params");
        }
        const model = pluralize.singular(credentials.table);
        const res: any = await request({
          url: AUTHENTICATION_METHODS.GOOGLE.endpoint.replace(":table", credentials.table),
          method: "POST",
          data: {
            email: credentials.email,
            access_token: credentials.access_token,
          },
        });
        if (res.data?.[model] && res.data?.access_token) {
          return {
            data: res.data[model],
            accessToken: res.data.access_token,
          };
        }
        throw new Error(res.data?.error_message || "Invalid response");
      } catch (e) {
        throw e;
      }
    },
  }),
  CredentialsProvider({
    id: AUTHENTICATION_METHODS.FACEBOOK.key,
    credentials: AUTHENTICATION_METHODS.FACEBOOK.credentials,
    authorize: async (credentials) => {
      try {
        if (!credentials) {
          throw new Error("Missing params");
        }
        const model = pluralize.singular(credentials.table);
        const res: any = await request({
          url: AUTHENTICATION_METHODS.FACEBOOK.endpoint.replace(":table", credentials.table),
          method: "POST",
          data: {
            access_token: credentials.access_token,
          },
        });
        if (res.data?.[model] && res.data?.access_token) {
          return {
            data: res.data[model],
            accessToken: res.data.access_token,
          };
        }
        throw new Error(res.data?.error_message || "Invalid response");
      } catch (e) {
        throw e;
      }
    },
  }),
  CredentialsProvider({
    id: AUTHENTICATION_METHODS.APPLE.key,
    credentials: AUTHENTICATION_METHODS.APPLE.credentials,
    authorize: async (credentials) => {
      try {
        if (!credentials) {
          throw new Error("Missing params");
        }
        const model = pluralize.singular(credentials.table);
        const res: any = await request({
          url: AUTHENTICATION_METHODS.APPLE.endpoint.replace(":table", credentials.table),
          method: "POST",
          data: {
            id_token: credentials.id_token,
            uid: credentials.uid,
          },
        });
        if (res.data?.[model] && res.data?.access_token) {
          return {
            data: res.data[model],
            accessToken: res.data.access_token,
          };
        }
        throw new Error(res.data?.error_message || "Invalid response");
      } catch (e) {
        throw e;
      }
    },
  }),
  CredentialsProvider({
    id: "testVerify",
    authorize: async () => {
      if (process.env.NODE_ENV !== "development") {
        throw new Error(REJECTED_AUTHENTICATION_ERROR);
      }
      return {
        authenticatedOwner: "User",
        authenticatedId: 1,
        accessToken: "__THIS_IS_TOKEN__",
        refreshToken: "__THIS_IS_REFRESH_TOKEN__",
        expiresIn: 200,
        tokenType: "Bearer",
        createdAt: Date.now(),
      };
    },
    credentials: { phone: { type: "text" } },
  }),
];

const options = {
  providers,
  callbacks: {
    async session({ session, token }: any) {
      if (!token.accessToken) {
        return null;
      }
      return {
        ...session,
        user: {
          authenticatedOwner: token.authenticatedOwner,
          authenticatedId: token.authenticatedId,
          accessToken: token.accessToken,
          expiresIn: token.expiresIn,
          error: token.error,
        },
      };
    },
    async jwt({ token, user }: any) {
      // Initial when user just logged
      if (user && user.accessToken) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          authenticatedOwner: user.authenticatedOwner,
          authenticatedId: user.authenticatedId,
          tokenType: user.tokenType,
          expiresIn: user.expiresIn,
          accessTokenExpireAt: user.createdAt + user.expiresIn * 1000,
        };
      }
      // https://next-auth.js.org/tutorials/refresh-token-rotation
      // NOTICE: Currently we refresh token everytime user load the new page
      if (
        token.refreshToken
        // !token.refreshToken ||
        // Date.now() + +(process.env.NEXT_PUBLIC_ACCESS_TOKEN_THRESHOLD || 0) <
        //   token.accessTokenExpireAt
      ) {
        return token;
      }
      const result = await handleRefreshToken(token.refreshToken);
      // Refresh token got error, it may because refresh token also expired or changed in service, we need logout
      if (!result?.accessToken || result.error) {
        return {
          ...token,
          error: result.error,
        };
      }
      return {
        authenticatedId: token.authenticatedId,
        authenticatedOwner: token.authenticatedOwner,
        tokenType: result.tokenType,
        expiresIn: result.expiresIn,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken || "",
        accessTokenExpireAt: (result.createdAt || 0) + result.expiresIn * 1000,
      };
    },
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
