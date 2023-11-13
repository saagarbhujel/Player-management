import React, { createContext, useState } from "react";
import { AuthToken, AuthUser } from "../types";
import { setCookie } from "../utils";

type AuthContextProps = {
  auth: AuthToken;
  setAuth: React.Dispatch<React.SetStateAction<AuthToken>>;
  user: AuthUser;
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialAuth = {
  accessToken: "",
  refreshToken: "",
};

const initialUser = {
  id: "",
  role: "",
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(initialAuth);
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setAuth(initialAuth);
    setUser(initialUser);
    setCookie("refresh_token", "", 0);
  };

  const contextData = {
    auth,
    setAuth,
    user,
    setUser,
    logout,
    isLoading,
    setIsLoading,
  };


  
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
