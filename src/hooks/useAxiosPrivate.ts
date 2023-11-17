import useRefrehToken from "./useRefrehToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const refresh = useRefrehToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest._isRetry) {
          prevRequest._isRetry = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (error) {
            console.log(error);
          }
        }
        if (!prevRequest._skipInterceptor) {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
