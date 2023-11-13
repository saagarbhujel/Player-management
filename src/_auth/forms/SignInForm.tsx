/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { AuthUser, LoginResponse } from "../../types";
import { setCookie } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useToast } from "../../hooks/useToast";

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth, setUser } = useAuth();
  const { setToast } = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isDisabled = !email || !password;

  const [error, setError] = useState<string>("");

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/player", {
        email,
        password,
      });
      // console.log(response);

      const data: LoginResponse = response.data;
      // console.log(data);

      if (response.status === 201) {
        setCookie("refresh_token", data.refreshToken, 14 * 86400);
        setAuth(data);
        const token = data.refreshToken;
        const decodedUserData = jwtDecode<JwtPayload>(token);
        // console.log(decodedUserData);
        setUser(decodedUserData as AuthUser);
        setToast("Login Successful", "success");
        navigate(from, { replace: true });
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error: any) {
      // console.log(error.response.status);
      if (error.response.status === 400 || error.response.status === 401) {
        setError(
          "Invalid Credentials. Please enter correct email and password."
        );
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  document.title = "PlayerManagement-Login";

  return (
    <section
      className={"flex flex-col justify-center items-center h-screen w-screen"}
    >
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Login to your account.
      </h2>
      <p className="text-light-3 small-medium md:base-regular">
        Welcome back! Please login to your account.
      </p>
      {error && <p className="text-red first-letter:capitalize">{error}</p>}
      <form onSubmit={handleLoginSubmit} className="  md:w-1/6 ">
        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id={"email"}
            className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="password">
            Password :
          </label>
          <input
            type="password"
            id={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out"
          />
        </div>
        <button
          type={"submit"}
          disabled={isDisabled}
          className="  bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-md px-4 py-2"
        >
          Login
        </button>

        <p className="text-small-regular text-light-4 text-center mt-4">
          Don&apos;t have an account?
          <NavLink
            to="/sign-up"
            className="text-blue-500 text-small-semibold ml-1"
          >
            SignUp
          </NavLink>
        </p>
      </form>
    </section>
  );
};

export default SignInForm;
