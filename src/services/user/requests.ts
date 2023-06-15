import { QueryFunctionContext } from "react-query";
import { serviceFetch } from "@utils/service";
import { getRoute } from "@utils/route";

export const DefaultGetApiUsersQueryKey: [string, string, string] = ["User", "GET", "/api/users"];
export type FetchGetApiUsersRequestBody = {
  pagination_page: number;
  pagination_limit: number;
  users: {
    isactive?: boolean;
    username?: string;
    dateofbirth?: Date;
    email?: string;
    password?: string;
  };
};
export type FetchGetApiUsersResponseBody = {
  total_pages: number;
  users: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    partybookings?: { id?: number; created_at?: Date; updated_at?: Date; user_id?: string }[];
    isactive?: boolean;
    username?: string;
    password?: string;
    dateofbirth?: Date;
    email?: string;
  }[];
};

export const fetchGetApiUsers = async (
  context: QueryFunctionContext<
    [string, string, string, Partial<FetchGetApiUsersRequestBody> | undefined]
  >
): Promise<FetchGetApiUsersResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/users", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};
export const DefaultGetApiUsersIdQueryKey: [string, string, string] = [
  "User",
  "GET",
  "/api/users/:id",
];
export type FetchGetApiUsersIdRequestBody = {
  id: string;
  users: { username?: string; password?: string; email?: string; dateofbirth?: Date };
};
export type FetchGetApiUsersIdResponseBody = {
  user: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    partybookings?: { id?: number; created_at?: Date; updated_at?: Date; user_id?: string }[];
    isactive?: boolean;
    username?: string;
    password?: string;
    dateofbirth?: Date;
    email?: string;
  };
};

export const fetchGetApiUsersId = async (
  context: QueryFunctionContext<
    [string, string, string, Partial<FetchGetApiUsersIdRequestBody> | undefined]
  >
): Promise<FetchGetApiUsersIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/users/:id", context.queryKey[3]),
    params: context.queryKey[3],
    method: "GET",
  });
};

export type MutatePostApiUsersRequestBody = {
  users: {
    isactive?: boolean;
    username?: string;
    dateofbirth?: Date;
    email?: string;
    password?: string;
  };
};
export type MutatePostApiUsersResponseBody = {
  user: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    partybookings?: { id?: number; created_at?: Date; updated_at?: Date; user_id?: string }[];
    isactive?: boolean;
    username?: string;
    password?: string;
    dateofbirth?: Date;
    email?: string;
  };
};

export const mutatePostApiUsers = async (
  body: MutatePostApiUsersRequestBody
): Promise<MutatePostApiUsersResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/users", body),
    method: "POST",
    data: body,
  });
};
export type MutatePutApiUsersIdRequestBody = {
  id: string;
  users: {
    isactive?: boolean;
    username?: string;
    dateofbirth?: Date;
    email?: string;
    password?: string;
  };
};
export type MutatePutApiUsersIdResponseBody = {
  user: {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    partybookings?: { id?: number; created_at?: Date; updated_at?: Date; user_id?: string }[];
    isactive?: boolean;
    username?: string;
    password?: string;
    dateofbirth?: Date;
    email?: string;
  };
};

export const mutatePutApiUsersId = async (
  body: MutatePutApiUsersIdRequestBody
): Promise<MutatePutApiUsersIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/users/:id", body),
    method: "PUT",
    data: body,
  });
};
export type MutateDeleteApiUsersIdRequestBody = {
  id: string;
  users: { username?: string; email?: string; password?: string; dateofbirth?: Date };
};
export type MutateDeleteApiUsersIdResponseBody = {};

export const mutateDeleteApiUsersId = async (
  body: MutateDeleteApiUsersIdRequestBody
): Promise<MutateDeleteApiUsersIdResponseBody> => {
  return serviceFetch({
    url: getRoute("/api/users/:id", body),
    method: "DELETE",
    data: body,
  });
};
