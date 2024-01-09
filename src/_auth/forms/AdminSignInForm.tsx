/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "../../api/axios";
import { AuthUser, LoginResponse } from "../../types";
import { setCookie } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useToast } from "../../hooks/useToast";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSignInForm = () => {

  const {setAuth, setUser} = useAuth();
  const {setToast} = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState< string>('');

  const isDisabled = !email || !password;

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password });
      // console.log(res);
      const data: LoginResponse = res.data;

      if(res.status === 201){
        setCookie("refresh_token", data.refreshToken, 14*86400);
        setAuth(data);
        const token = data.refreshToken;
        const decodedToken = jwtDecode<JwtPayload>(token);
        // console.log(decodedToken);
        setUser(decodedToken as AuthUser)
        setToast("Login Successful", "success");
        navigate(from, {replace: true})
      } else{
        setToast("Login Failed", "error");
      }
    } catch (error: any) {
     // console.log(error.response.status);
     if (error.response.status === 400 || error.response.status === 401) {
      setError(
        "Invalid Credentials. Please enter correct email and password."
      );
    } else {
      setError(error.response.data.message);
    }
  }
      
    }
  

  document.title = "Player Management-Admin Sign In";
  return (
    <section className="flex flex-col justify-center items-center h-screen w-screen">
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Login to your account.
      </h2>
      <p className="text-light-3 small-medium md:base-regular">
        Welcome to the admin page.
      </p>
      <p className="text-light-3 small-medium md:base-regular">
        Please login to your account to manage the players.
      </p>
      {
        error && <p className=" text-red first-letter:capitalize">{error}</p>
      }
      <form onSubmit={handleLoginSubmit} className="md:w-1/6">
        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="email">
            Email:
          </label>
          <input
            className="border border-gray-300 h-9 pl-2 rounded-md font-light text-sm outline-none focus:ring-4 ring-blue-500/20 ease-in-out"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="password">
            Password:
          </label>
          <input
            className="border border-gray-300 h-9 pl-2 rounded-md font-light text-sm outline-none focus:ring-4 ring-blue-500/20 ease-in-out"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="passwordd"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-md px-4 py-2"
          disabled={isDisabled}
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default AdminSignInForm;
