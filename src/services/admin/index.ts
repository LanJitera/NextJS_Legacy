import { useEffect, useState } from "react";
import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { DEFAULT_QUERY_OPTIONS } from "@constants/query";
import { fetchToServiceResponse } from "@utils/service";
import {
  FetchGetApiAdminsRequestBody,
  FetchGetApiAdminsResponseBody,
  DefaultGetApiAdminsQueryKey,
  fetchGetApiAdmins,
  FetchGetApiAdminsIdRequestBody,
  FetchGetApiAdminsIdResponseBody,
  DefaultGetApiAdminsIdQueryKey,
  fetchGetApiAdminsId,
  MutatePostApiAdminsRequestBody,
  MutatePostApiAdminsResponseBody,
  mutatePostApiAdmins,
  MutatePutApiAdminsIdRequestBody,
  MutatePutApiAdminsIdResponseBody,
  mutatePutApiAdminsId,
  MutateDeleteApiAdminsIdRequestBody,
  MutateDeleteApiAdminsIdResponseBody,
  mutateDeleteApiAdminsId,
} from "./requests";

export const useAdminService = () => {
  const queryClient = useQueryClient();

  const mutationPostApiAdmins = useMutation(mutatePostApiAdmins);

  const mutationPutApiAdminsId = useMutation(mutatePutApiAdminsId);

  const mutationDeleteApiAdminsId = useMutation(mutateDeleteApiAdminsId);

  const useGetApiAdmins = () => {
    const [query, setQuery] =
      useState<{ params?: Partial<FetchGetApiAdminsRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiAdminsQueryKey, query?.params],
      fetchGetApiAdmins,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiAdminsRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiAdminsRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiAdminsRequestBody> = {}
      ): Promise<FetchGetApiAdminsResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [
          ...DefaultGetApiAdminsQueryKey,
          params,
        ]);
      },
    };
  };

  const useGetApiAdminsId = () => {
    const [query, setQuery] =
      useState<{ params?: Partial<FetchGetApiAdminsIdRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiAdminsIdQueryKey, query?.params],
      fetchGetApiAdminsId,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiAdminsIdRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiAdminsIdRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiAdminsIdRequestBody> = {}
      ): Promise<FetchGetApiAdminsIdResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [
          ...DefaultGetApiAdminsIdQueryKey,
          params,
        ]);
      },
    };
  };

  const postApiAdmins = {
    fetch: (
      body?: MutatePostApiAdminsRequestBody,
      options: MutateOptions<
        MutatePostApiAdminsResponseBody,
        unknown,
        MutatePostApiAdminsRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPostApiAdmins.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Admin");
        },
      });
    },
  };

  const putApiAdminsId = {
    fetch: (
      body?: MutatePutApiAdminsIdRequestBody,
      options: MutateOptions<
        MutatePutApiAdminsIdResponseBody,
        unknown,
        MutatePutApiAdminsIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPutApiAdminsId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Admin");
        },
      });
    },
  };

  const deleteApiAdminsId = {
    fetch: (
      body?: MutateDeleteApiAdminsIdRequestBody,
      options: MutateOptions<
        MutateDeleteApiAdminsIdResponseBody,
        unknown,
        MutateDeleteApiAdminsIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationDeleteApiAdminsId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Admin");
        },
      });
    },
  };

  return {
    useGetApiAdmins,

    useGetApiAdminsId,

    postApiAdmins,
    mutationPostApiAdmins,

    putApiAdminsId,
    mutationPutApiAdminsId,

    deleteApiAdminsId,
    mutationDeleteApiAdminsId,
  };
};
