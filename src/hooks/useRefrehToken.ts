import { useRef } from "react";
import useAuth from "./useAuth";
import { getCookies, setCookie } from "../utils";
import axios from "../api/axios";
import { AuthToken, AuthUser } from "../types";
import { JwtPayload, jwtDecode } from "jwt-decode";

const useRefrehToken = () => {
  const { auth, setAuth, setUser, setIsLoading } = useAuth();
  const isRefreshing = useRef(false);

  const refresh = async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    setIsLoading(true);

    const refreshToken = getCookies("refresh_token");

    if (refreshToken) {
      try {
        const res = await axios.post("/common/generaterefresh", {
         refreshToken: refreshToken,
        });
        // console.log(res);
        // console.log(typeof refreshToken);
        
        if (res.status === 201) {
          const data: AuthToken = res.data;
          setCookie("refresh_token", data.refreshToken, 14 * 86400);
          setAuth(data);
        //   console.log(data);
          
          const decoded = jwtDecode<JwtPayload>(data.refreshToken);
          setUser(decoded as AuthUser);

          isRefreshing.current = false;
          setIsLoading(false);
          return data;
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
    isRefreshing.current = false;
    setIsLoading(false);
    return auth;
  };
  return refresh;
};

export default useRefrehToken;
