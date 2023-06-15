import { useEffect, useState } from "react";
import { MutateOptions, useMutation, useQuery, useQueryClient } from "react-query";
import { DEFAULT_QUERY_OPTIONS } from "@constants/query";
import { fetchToServiceResponse } from "@utils/service";
import {
  FetchGetApiUsersRequestBody,
  FetchGetApiUsersResponseBody,
  DefaultGetApiUsersQueryKey,
  fetchGetApiUsers,
  FetchGetApiUsersIdRequestBody,
  FetchGetApiUsersIdResponseBody,
  DefaultGetApiUsersIdQueryKey,
  fetchGetApiUsersId,
  MutatePostApiUsersRequestBody,
  MutatePostApiUsersResponseBody,
  mutatePostApiUsers,
  MutatePutApiUsersIdRequestBody,
  MutatePutApiUsersIdResponseBody,
  mutatePutApiUsersId,
  MutateDeleteApiUsersIdRequestBody,
  MutateDeleteApiUsersIdResponseBody,
  mutateDeleteApiUsersId,
} from "./requests";

export const useUserService = () => {
  const queryClient = useQueryClient();

  const mutationPostApiUsers = useMutation(mutatePostApiUsers);

  const mutationPutApiUsersId = useMutation(mutatePutApiUsersId);

  const mutationDeleteApiUsersId = useMutation(mutateDeleteApiUsersId);

  const useGetApiUsers = () => {
    const [query, setQuery] = useState<{ params?: Partial<FetchGetApiUsersRequestBody> }>();
    const queryResult = useQuery([...DefaultGetApiUsersQueryKey, query?.params], fetchGetApiUsers, {
      ...DEFAULT_QUERY_OPTIONS,
      enabled: query !== undefined,
    });
    return {
      query: (params: Partial<FetchGetApiUsersRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiUsersRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiUsersRequestBody> = {}
      ): Promise<FetchGetApiUsersResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [...DefaultGetApiUsersQueryKey, params]);
      },
    };
  };

  const useGetApiUsersId = () => {
    const [query, setQuery] = useState<{ params?: Partial<FetchGetApiUsersIdRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiUsersIdQueryKey, query?.params],
      fetchGetApiUsersId,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiUsersIdRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiUsersIdRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiUsersIdRequestBody> = {}
      ): Promise<FetchGetApiUsersIdResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [...DefaultGetApiUsersIdQueryKey, params]);
      },
    };
  };

  const postApiUsers = {
    fetch: (
      body?: MutatePostApiUsersRequestBody,
      options: MutateOptions<
        MutatePostApiUsersResponseBody,
        unknown,
        MutatePostApiUsersRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPostApiUsers.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("User");
        },
      });
    },
  };

  const putApiUsersId = {
    fetch: (
      body?: MutatePutApiUsersIdRequestBody,
      options: MutateOptions<
        MutatePutApiUsersIdResponseBody,
        unknown,
        MutatePutApiUsersIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPutApiUsersId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("User");
        },
      });
    },
  };

  const deleteApiUsersId = {
    fetch: (
      body?: MutateDeleteApiUsersIdRequestBody,
      options: MutateOptions<
        MutateDeleteApiUsersIdResponseBody,
        unknown,
        MutateDeleteApiUsersIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationDeleteApiUsersId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("User");
        },
      });
    },
  };

  return {
    useGetApiUsers,

    useGetApiUsersId,

    postApiUsers,
    mutationPostApiUsers,

    putApiUsersId,
    mutationPutApiUsersId,

    deleteApiUsersId,
    mutationDeleteApiUsersId,
  };
};
