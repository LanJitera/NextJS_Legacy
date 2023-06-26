import { useEffect, useState } from "react";
import { MutateOptions, useMutation, useQuery, useQueryClient } from "react-query";
import { DEFAULT_QUERY_OPTIONS } from "@constants/query";
import { fetchToServiceResponse } from "@utils/service";
import {
  FetchGetApiPartiesRequestBody,
  FetchGetApiPartiesResponseBody,
  DefaultGetApiPartiesQueryKey,
  fetchGetApiParties,
  FetchGetApiPartiesIdRequestBody,
  FetchGetApiPartiesIdResponseBody,
  DefaultGetApiPartiesIdQueryKey,
  fetchGetApiPartiesId,
  FetchGetApiPartiesBookingHistoryRequestBody,
  FetchGetApiPartiesBookingHistoryResponseBody,
  DefaultGetApiPartiesBookingHistoryQueryKey,
  fetchGetApiPartiesBookingHistory,
  MutatePostApiPartiesRequestBody,
  MutatePostApiPartiesResponseBody,
  mutatePostApiParties,
  MutatePutApiPartiesIdRequestBody,
  MutatePutApiPartiesIdResponseBody,
  mutatePutApiPartiesId,
  MutateDeleteApiPartiesIdRequestBody,
  MutateDeleteApiPartiesIdResponseBody,
  mutateDeleteApiPartiesId,
} from "./requests";

export const usePartyService = () => {
  const queryClient = useQueryClient();

  const mutationPostApiParties = useMutation(mutatePostApiParties);

  const mutationPutApiPartiesId = useMutation(mutatePutApiPartiesId);

  const mutationDeleteApiPartiesId = useMutation(mutateDeleteApiPartiesId);

  const useGetApiParties = () => {
    const [query, setQuery] = useState<{ params?: Partial<FetchGetApiPartiesRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiPartiesQueryKey, query?.params],
      fetchGetApiParties,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiPartiesRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiPartiesRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiPartiesRequestBody> = {}
      ): Promise<FetchGetApiPartiesResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [...DefaultGetApiPartiesQueryKey, params]);
      },
    };
  };

  const useGetApiPartiesId = () => {
    const [query, setQuery] = useState<{ params?: Partial<FetchGetApiPartiesIdRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiPartiesIdQueryKey, query?.params],
      fetchGetApiPartiesId,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiPartiesIdRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiPartiesIdRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiPartiesIdRequestBody> = {}
      ): Promise<FetchGetApiPartiesIdResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [...DefaultGetApiPartiesIdQueryKey, params]);
      },
    };
  };

  const useGetApiPartiesBookingHistory = () => {
    const [query, setQuery] =
      useState<{ params?: Partial<FetchGetApiPartiesBookingHistoryRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiPartiesBookingHistoryQueryKey, query?.params],
      fetchGetApiPartiesBookingHistory,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiPartiesBookingHistoryRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiPartiesBookingHistoryRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiPartiesBookingHistoryRequestBody> = {}
      ): Promise<FetchGetApiPartiesBookingHistoryResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [
          ...DefaultGetApiPartiesBookingHistoryQueryKey,
          params,
        ]);
      },
    };
  };

  const postApiParties = {
    fetch: (
      body?: MutatePostApiPartiesRequestBody,
      options: MutateOptions<
        MutatePostApiPartiesResponseBody,
        unknown,
        MutatePostApiPartiesRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPostApiParties.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Party");
        },
      });
    },
  };

  const putApiPartiesId = {
    fetch: (
      body?: MutatePutApiPartiesIdRequestBody,
      options: MutateOptions<
        MutatePutApiPartiesIdResponseBody,
        unknown,
        MutatePutApiPartiesIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPutApiPartiesId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Party");
        },
      });
    },
  };

  const deleteApiPartiesId = {
    fetch: (
      body?: MutateDeleteApiPartiesIdRequestBody,
      options: MutateOptions<
        MutateDeleteApiPartiesIdResponseBody,
        unknown,
        MutateDeleteApiPartiesIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationDeleteApiPartiesId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Party");
        },
      });
    },
  };

  return {
    useGetApiParties,

    useGetApiPartiesId,

    useGetApiPartiesBookingHistory,

    postApiParties,
    mutationPostApiParties,

    putApiPartiesId,
    mutationPutApiPartiesId,

    deleteApiPartiesId,
    mutationDeleteApiPartiesId,
  };
};
