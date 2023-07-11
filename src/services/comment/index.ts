import { useEffect, useState } from "react";
import { MutateOptions, useMutation, useQuery, useQueryClient } from "react-query";
import { DEFAULT_QUERY_OPTIONS } from "@constants/query";
import { fetchToServiceResponse } from "@utils/service";
import {
  FetchGetApiCommentsRequestBody,
  FetchGetApiCommentsResponseBody,
  DefaultGetApiCommentsQueryKey,
  fetchGetApiComments,
  FetchGetApiCommentsIdRequestBody,
  FetchGetApiCommentsIdResponseBody,
  DefaultGetApiCommentsIdQueryKey,
  fetchGetApiCommentsId,
  MutatePostApiCommentsRequestBody,
  MutatePostApiCommentsResponseBody,
  mutatePostApiComments,
  MutatePutApiCommentsIdRequestBody,
  MutatePutApiCommentsIdResponseBody,
  mutatePutApiCommentsId,
  MutateDeleteApiCommentsIdRequestBody,
  MutateDeleteApiCommentsIdResponseBody,
  mutateDeleteApiCommentsId,
} from "./requests";

export const useCommentService = () => {
  const queryClient = useQueryClient();

  const mutationPostApiComments = useMutation(mutatePostApiComments);

  const mutationPutApiCommentsId = useMutation(mutatePutApiCommentsId);

  const mutationDeleteApiCommentsId = useMutation(mutateDeleteApiCommentsId);

  const useGetApiComments = () => {
    const [query, setQuery] = useState<{ params?: Partial<FetchGetApiCommentsRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiCommentsQueryKey, query?.params],
      fetchGetApiComments,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiCommentsRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiCommentsRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiCommentsRequestBody> = {}
      ): Promise<FetchGetApiCommentsResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [...DefaultGetApiCommentsQueryKey, params]);
      },
    };
  };

  const useGetApiCommentsId = () => {
    const [query, setQuery] = useState<{ params?: Partial<FetchGetApiCommentsIdRequestBody> }>();
    const queryResult = useQuery(
      [...DefaultGetApiCommentsIdQueryKey, query?.params],
      fetchGetApiCommentsId,
      {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: query !== undefined,
      }
    );
    return {
      query: (params: Partial<FetchGetApiCommentsIdRequestBody> = {}) => {
        setQuery({ params });
      },
      useQuery: (params: Partial<FetchGetApiCommentsIdRequestBody> = {}) => {
        useEffect(() => {
          setQuery({ params });
        }, []);
        return queryResult;
      },
      fetch: (
        params: Partial<FetchGetApiCommentsIdRequestBody> = {}
      ): Promise<FetchGetApiCommentsIdResponseBody> => {
        setQuery({ params });
        return fetchToServiceResponse(queryClient, [...DefaultGetApiCommentsIdQueryKey, params]);
      },
    };
  };

  const postApiComments = {
    fetch: (
      body?: MutatePostApiCommentsRequestBody,
      options: MutateOptions<
        MutatePostApiCommentsResponseBody,
        unknown,
        MutatePostApiCommentsRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPostApiComments.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Comment");
        },
      });
    },
  };

  const putApiCommentsId = {
    fetch: (
      body?: MutatePutApiCommentsIdRequestBody,
      options: MutateOptions<
        MutatePutApiCommentsIdResponseBody,
        unknown,
        MutatePutApiCommentsIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationPutApiCommentsId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Comment");
        },
      });
    },
  };

  const deleteApiCommentsId = {
    fetch: (
      body?: MutateDeleteApiCommentsIdRequestBody,
      options: MutateOptions<
        MutateDeleteApiCommentsIdResponseBody,
        unknown,
        MutateDeleteApiCommentsIdRequestBody,
        unknown
      > = {}
    ) => {
      if (!body) {
        throw new Error("MISSING_BODY");
      }
      return mutationDeleteApiCommentsId.mutateAsync(body, {
        ...options,
        onSuccess: (data, variables, context) => {
          options.onSuccess && options.onSuccess(data, variables, context);
          queryClient.invalidateQueries("Comment");
        },
      });
    },
  };

  return {
    useGetApiComments,

    useGetApiCommentsId,

    postApiComments,
    mutationPostApiComments,

    putApiCommentsId,
    mutationPutApiCommentsId,

    deleteApiCommentsId,
    mutationDeleteApiCommentsId,
  };
};
