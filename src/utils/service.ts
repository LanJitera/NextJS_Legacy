import qs from "qs";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { QueryClient, QueryObserver, QueryKey } from "react-query";
import { requestAuthenticated } from "@utils/request";

export function fetchToServiceResponse<T>(
  queryClient: QueryClient,
  queryKey: QueryKey
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const observer = new QueryObserver(queryClient, { queryKey });
      const unsubscribe = observer.subscribe((result) => {
        if (result.status === "error") {
          unsubscribe && unsubscribe();
          reject(result.error);
        }
        if (result.status === "success") {
          unsubscribe && unsubscribe();
          resolve(result.data as T);
        }
      });
    }, 0);
  });
}

export const fetchResponseToServiceData = (
  res: AxiosResponse,
  model: string
) => {
  return res.data?.[model];
};

export const serviceFetch = async (
  options: AxiosRequestConfig,
  model?: string
) => {
  const res = await requestAuthenticated({
    ...options,
    paramsSerializer: (params: unknown) => {
      return qs.stringify(params);
    },
  });
  if (!model) {
    return res.data;
  }
  return fetchResponseToServiceData(res, model);
};
