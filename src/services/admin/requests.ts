import { QueryFunctionContext } from "react-query";
import { serviceFetch } from "@utils/service";
import { getRoute } from "@utils/route";

export const DefaultGetApiAdminsQueryKey: [string, string, string] = [
  "Admin",
  "GET",
  "/api/admins",
];
export type FetchGetApiAdminsRequestBody = {
  pagination_page: number;
  pagination_limit: number;
  admins: { name?: string; email?: string };
};
export type FetchGetApiAdminsResponseBody = {
  total_pages: number;
  admins: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    parties?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
      admin_id?: string;
    }[];
    name?: string;
    email?: string;
  }[];
};

export const fetchGetApiAdmins = async (
  context: QueryFunctionContext<
    [string, string, string, Partial<FetchGetApiAdminsRequestBody> | undefined]
  >
): Promise<FetchGetApiAdminsResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/admins", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};
export const DefaultGetApiAdminsIdQueryKey: [string, string, string] = [
  "Admin",
  "GET",
  "/api/admins/:id",
];
export type FetchGetApiAdminsIdRequestBody = {
  id: string;
  admins: { email?: string; name?: string };
};
export type FetchGetApiAdminsIdResponseBody = {
  admin: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    parties?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
      admin_id?: string;
    }[];
    name?: string;
    email?: string;
  };
};

export const fetchGetApiAdminsId = async (
  context: QueryFunctionContext<
    [
      string,
      string,
      string,
      Partial<FetchGetApiAdminsIdRequestBody> | undefined
    ]
  >
): Promise<FetchGetApiAdminsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/admins/:id", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};

export type MutatePostApiAdminsRequestBody = {
  admins: { name?: string; email?: string };
};
export type MutatePostApiAdminsResponseBody = {
  admin: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    parties?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
      admin_id?: string;
    }[];
    name?: string;
    email?: string;
  };
};

export const mutatePostApiAdmins = async (
  body: MutatePostApiAdminsRequestBody
): Promise<MutatePostApiAdminsResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/admins", body),
    method: "POST",
    data: body,
  });
};
export type MutatePutApiAdminsIdRequestBody = {
  id: string;
  admins: { name?: string; email?: string };
};
export type MutatePutApiAdminsIdResponseBody = {
  admin: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    parties?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
      admin_id?: string;
    }[];
    name?: string;
    email?: string;
  };
};

export const mutatePutApiAdminsId = async (
  body: MutatePutApiAdminsIdRequestBody
): Promise<MutatePutApiAdminsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/admins/:id", body),
    method: "PUT",
    data: body,
  });
};
export type MutateDeleteApiAdminsIdRequestBody = {
  id: string;
  admins: { email?: string; name?: string };
};
export type MutateDeleteApiAdminsIdResponseBody = {};

export const mutateDeleteApiAdminsId = async (
  body: MutateDeleteApiAdminsIdRequestBody
): Promise<MutateDeleteApiAdminsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/admins/:id", body),
    method: "DELETE",
    data: body,
  });
};
