import axios from "axios";
import memoryStorage from "@utils/memoryStorage";
import publicConfigs from "@constants/env";
import { refreshToken } from "@services/authentication/requests";
import { STORAGE_KEYS } from "@constants/storage";

export const request = axios.create();

request.interceptors.request.use(function (config) {
  config.baseURL = publicConfigs.NEXT_PUBLIC_API_URL;
  config.headers = {
    Accept: "application/json",
    ...config.headers,
  };
  return config;
});

export const requestAuthenticated = axios.create();

let refreshProcess: Promise<any> | undefined;
requestAuthenticated.interceptors.request.use(async function (config) {
  let authenticationInfo = memoryStorage.getAuthenticationInfo();
  config.baseURL = publicConfigs.NEXT_PUBLIC_API_URL;
  config.headers = {
    Accept: "application/json",
    ...config.headers,
  };

  if (!authenticationInfo) {
    return config;
  }
  const tokenCreatedTime = localStorage.getItem(STORAGE_KEYS.TOKEN_CREATED_TIME);
  if (
    !refreshProcess &&
    tokenCreatedTime &&
    Date.now() + +(publicConfigs.ACCESS_TOKEN_THRESHOLD || 0) >=
      +tokenCreatedTime + authenticationInfo.expiresIn * 1000
  ) {
    refreshProcess = refreshToken().then((result) => {
      refreshProcess = undefined;
      return result;
    });
  }
  if (refreshProcess) {
    authenticationInfo = await refreshProcess;
  }
  config.headers = {
    ...(authenticationInfo?.accessToken
      ? { Authorization: `Bearer ${authenticationInfo?.accessToken}` }
      : {}),
    Accept: "application/json",
    ...(config.headers || {}),
  };
  return config;
});

requestAuthenticated.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // Try to refresh token in this case
    if (axios.isAxiosError(error) && error.response?.status === 401 && !error.config.retry) {
      let authenticationInfo = memoryStorage.getAuthenticationInfo();
      refreshProcess = refreshToken().then((result) => {
        refreshProcess = undefined;
        return result;
      });
      if (refreshProcess) {
        authenticationInfo = await refreshProcess;
      }
      error.config.headers = {
        ...error.config.headers,
        Authorization: `Bearer ${authenticationInfo?.accessToken}`,
      };
      error.config.retry = true;
      return request.request(error.config);
    }
    return Promise.reject(error);
  }
);
