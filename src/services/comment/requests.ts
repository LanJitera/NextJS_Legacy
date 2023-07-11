import { QueryFunctionContext } from "react-query";
import { serviceFetch } from "@utils/service";
import { getRoute } from "@utils/route";

export const DefaultGetApiCommentsQueryKey: [string, string, string] = [
  "Comment",
  "GET",
  "/api/comments",
];
export type FetchGetApiCommentsRequestBody = {
  pagination_page: number;
  pagination_limit: number;
  comments: { party_id?: string; user_id?: string; comment?: string; id_cmtrep?: number };
};
export type FetchGetApiCommentsResponseBody = {
  total_pages: number;
  comments: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: string;
      admin_id?: string;
      describe?: string;
      requiredage?: number;
      img?: string;
    };
    party_id?: string;
    user?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      isactive?: boolean;
      username?: string;
      password?: string;
      dateofbirth?: Date;
      email?: string;
    };
    user_id?: string;
    comment?: string;
    id_cmtrep?: number;
  }[];
};

export const fetchGetApiComments = async (
  context: QueryFunctionContext<
    [string, string, string, Partial<FetchGetApiCommentsRequestBody> | undefined]
  >
): Promise<FetchGetApiCommentsResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/comments", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};
export const DefaultGetApiCommentsIdQueryKey: [string, string, string] = [
  "Comment",
  "GET",
  "/api/comments/:id",
];
export type FetchGetApiCommentsIdRequestBody = { id: string };
export type FetchGetApiCommentsIdResponseBody = {
  comment: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: string;
      admin_id?: string;
      describe?: string;
      requiredage?: number;
      img?: string;
    };
    party_id?: string;
    user?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      isactive?: boolean;
      username?: string;
      password?: string;
      dateofbirth?: Date;
      email?: string;
    };
    user_id?: string;
    comment?: string;
    id_cmtrep?: number;
  };
};

export const fetchGetApiCommentsId = async (
  context: QueryFunctionContext<
    [string, string, string, Partial<FetchGetApiCommentsIdRequestBody> | undefined]
  >
): Promise<FetchGetApiCommentsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/comments/:id", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};

export type MutatePostApiCommentsRequestBody = {
  comments: { party_id?: string; user_id?: string; comment?: string; id_cmtrep?: number };
};
export type MutatePostApiCommentsResponseBody = {
  comment: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: string;
      admin_id?: string;
      describe?: string;
      requiredage?: number;
      img?: string;
    };
    party_id?: string;
    user?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      isactive?: boolean;
      username?: string;
      password?: string;
      dateofbirth?: Date;
      email?: string;
    };
    user_id?: string;
    comment?: string;
    id_cmtrep?: number;
  };
};

export const mutatePostApiComments = async (
  body: MutatePostApiCommentsRequestBody
): Promise<MutatePostApiCommentsResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/comments", body),
    method: "POST",
    data: body,
  });
};
export type MutatePutApiCommentsIdRequestBody = {
  id: string;
  comments: { party_id?: string; user_id?: string; comment?: string; id_cmtrep?: number };
};
export type MutatePutApiCommentsIdResponseBody = {
  comment: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    party?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      nameparty?: string;
      partystarttime?: Date;
      partylocation?: string;
      numberofpeople?: number;
      isstatus?: string;
      admin_id?: string;
      describe?: string;
      requiredage?: number;
      img?: string;
    };
    party_id?: string;
    user?: {
      id?: number;
      created_at?: Date;
      updated_at?: Date;
      isactive?: boolean;
      username?: string;
      password?: string;
      dateofbirth?: Date;
      email?: string;
    };
    user_id?: string;
    comment?: string;
    id_cmtrep?: number;
  };
};

export const mutatePutApiCommentsId = async (
  body: MutatePutApiCommentsIdRequestBody
): Promise<MutatePutApiCommentsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/comments/:id", body),
    method: "PUT",
    data: body,
  });
};
export type MutateDeleteApiCommentsIdRequestBody = { id: string };
export type MutateDeleteApiCommentsIdResponseBody = {};

export const mutateDeleteApiCommentsId = async (
  body: MutateDeleteApiCommentsIdRequestBody
): Promise<MutateDeleteApiCommentsIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/comments/:id", body),
    method: "DELETE",
    data: body,
  });
};
