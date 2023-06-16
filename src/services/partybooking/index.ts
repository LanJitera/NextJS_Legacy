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
  FetchGetApiPartybookingsRequestBody,
  FetchGetApiPartybookingsResponseBody,
  DefaultGetApiPartybookingsQueryKey,
  fetchGetApiPartybookings,
  FetchGetApiPartybookingsIdRequestBody,
  FetchGetApiPartybookingsIdResponseBody,
  DefaultGetApiPartybookingsIdQueryKey,
  fetchGetApiPartybookingsId,
  MutatePostApiPartybookingsRequestBody,
  MutatePostApiPartybookingsResponseBody,
  mutatePostApiPartybookings,
  MutatePutApiPartybookingsIdRequestBody,
  MutatePutApiPartybookingsIdResponseBody,
  mutatePutApiPartybookingsId,
  MutateDeleteApiPartybookingsIdRequestBody,
  MutateDeleteApiPartybookingsIdResponseBody,
  mutateDeleteApiPartybookingsId,
} from "./requests";

export const usePartybookingService = () => {
  const queryClient = useQueryClient();

  const mutationPostApiPartybookings = useMutation(mutatePostApiPartybookings);

  const mutationPutApiPartybookingsId = useMutation(
    mutatePutApiPartybookingsId
  );

  const mutationDeleteApiPartybookingsId = useMutation(
    mutateDeleteApiPartybookingsId
  );

  const useGetApiPartybookings = () => {
    const [query, setQuery] =
      useState<{ params?: Partial<FetchGetApiPartybookingsRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiPartybookingsQueryKey, query?.params],
      fetchGetApiPartybookings,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiPartybookingsRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiPartybookingsRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiPartybookingsRequestBody> = {}
      ): Promise<FetchGetApiPartybookingsResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [
          ...DefaultGetApiPartybookingsQueryKey,
          params,
        ]);
      },
    };
  };

  const useGetApiPartybookingsId = () => {
    const [query, setQuery] =
      useState<{ params?: Partial<FetchGetApiPartybookingsIdRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiPartybookingsIdQueryKey, query?.params],
      fetchGetApiPartybookingsId,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiPartybookingsIdRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (
        params: Partial<FetchGetApiPartybookingsIdRequestBody> = {}
      ) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiPartybookingsIdRequestBody> = {}
      ): Promise<FetchGetApiPartybookingsIdResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [
          ...DefaultGetApiPartybookingsIdQueryKey,
          params,
        ]);
      },
    };
  };

  const postApiPartybookings = {
    fetch: (
      body?: MutatePostApiPartybookingsRequestBody,
      options: MutateOptions<
        MutatePostApiPartybookingsResponseBody,
        unknown,
        MutatePostApiPartybookingsRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPostApiPartybookings.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Partybooking");
        },
      });
    },
  };

  const putApiPartybookingsId = {
    fetch: (
      body?: MutatePutApiPartybookingsIdRequestBody,
      options: MutateOptions<
        MutatePutApiPartybookingsIdResponseBody,
        unknown,
        MutatePutApiPartybookingsIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPutApiPartybookingsId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Partybooking");
        },
      });
    },
  };

  const deleteApiPartybookingsId = {
    fetch: (
      body?: MutateDeleteApiPartybookingsIdRequestBody,
      options: MutateOptions<
        MutateDeleteApiPartybookingsIdResponseBody,
        unknown,
        MutateDeleteApiPartybookingsIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationDeleteApiPartybookingsId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Partybooking");
        },
      });
    },
  };

  return {
    useGetApiPartybookings,

    useGetApiPartybookingsId,

    postApiPartybookings,
    mutationPostApiPartybookings,

    putApiPartybookingsId,
    mutationPutApiPartybookingsId,

    deleteApiPartybookingsId,
    mutationDeleteApiPartybookingsId,
  };
};
