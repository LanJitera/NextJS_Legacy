import { QueryFunctionContext } from "react-query";
import { serviceFetch } from "@utils/service";
import { getRoute } from "@utils/route";

export const DefaultGetApiPartybookingsQueryKey: [string, string, string] = [
  "Partybooking",
  "GET",
  "/api/partybookings",
];
export type FetchGetApiPartybookingsRequestBody = {
  pagination_page: number;
  pagination_limit: number;
  partybookings: { user_id?: string; party_id?: string; status?: string };
};
export type FetchGetApiPartybookingsResponseBody = {
  total_pages: number;
  partybookings: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: { id?: number; created_at?: Date; updated_at?: Date };
    user_id?: string;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
    };
    party_id?: string;
    status?: boolean;
  }[];
};

export const fetchGetApiPartybookings = async (
  context: QueryFunctionContext<
    [
      string,
      string,
      string,
      Partial<FetchGetApiPartybookingsRequestBody> | undefined
    ]
  >
): Promise<FetchGetApiPartybookingsResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/partybookings", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};
export const DefaultGetApiPartybookingsIdQueryKey: [string, string, string] = [
  "Partybooking",
  "GET",
  "/api/partybookings/:id",
];
export type FetchGetApiPartybookingsIdRequestBody = { id: string };
export type FetchGetApiPartybookingsIdResponseBody = {
  partybooking: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: { id?: number; created_at?: Date; updated_at?: Date };
    user_id?: string;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
    };
    party_id?: string;
    status?: boolean;
  };
};

export const fetchGetApiPartybookingsId = async (
  context: QueryFunctionContext<
    [
      string,
      string,
      string,
      Partial<FetchGetApiPartybookingsIdRequestBody> | undefined
    ]
  >
): Promise<FetchGetApiPartybookingsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/partybookings/:id", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};

export type MutatePostApiPartybookingsRequestBody = {
  partybookings: { user_id?: string; party_id?: string; status?: string };
};
export type MutatePostApiPartybookingsResponseBody = {
  partybooking: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: { id?: number; created_at?: Date; updated_at?: Date };
    user_id?: string;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
    };
    party_id?: string;
    status?: boolean;
  };
};

export const mutatePostApiPartybookings = async (
  body: MutatePostApiPartybookingsRequestBody
): Promise<MutatePostApiPartybookingsResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/partybookings", body),
    method: "POST",
    data: body,
  });
};
export type MutatePutApiPartybookingsIdRequestBody = {
  id: string;
  partybookings: { user_id?: string; party_id?: string; status?: string };
};
export type MutatePutApiPartybookingsIdResponseBody = {
  partybooking: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: { id?: number; created_at?: Date; updated_at?: Date };
    user_id?: string;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: boolean;
    };
    party_id?: string;
    status?: boolean;
  };
};

export const mutatePutApiPartybookingsId = async (
  body: MutatePutApiPartybookingsIdRequestBody
): Promise<MutatePutApiPartybookingsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/partybookings/:id", body),
    method: "PUT",
    data: body,
  });
};
export type MutateDeleteApiPartybookingsIdRequestBody = { id: string };
export type MutateDeleteApiPartybookingsIdResponseBody = {};

export const mutateDeleteApiPartybookingsId = async (
  body: MutateDeleteApiPartybookingsIdRequestBody
): Promise<MutateDeleteApiPartybookingsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/partybookings/:id", body),
    method: "DELETE",
    data: body,
  });
};
