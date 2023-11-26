import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Country, CountryMap } from "../types";
import Loader from "./Loader";
import { useToast } from "../hooks/useToast";

const initialFormFields = {
  name: "",
  email: "",
  password: "",
  role: "",
  country: "",
};
const CreateUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setToast } = useToast();

  const [formFields, setFormFields] = useState(initialFormFields);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [nameError, setNameError] = useState("");

  const resetErrors = () => {
    setError("");
    setEmailError("");
    setPasswordError("");
    setRoleError("");
    setCountryError("");
    setNameError("");
  };

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();
    setLoading(true);
    try {
      let data = {};
      let endPoint = "/user";

      if (formFields.role === "player") {
        const { role, ...playerData } = formFields;
        endPoint = "/player";
        data = playerData;
      } else {
        const { country, ...userData } = formFields;
        data = userData;
      }

      const res = await axiosPrivate.post(endPoint, data);
      console.log(res);

      setToast("User created successfully.", "success");
      setFormFields(initialFormFields);
    } catch (error: any) {
      if (error.response.status !== 201) {
        const data: { message: string | string[] } = error.response.data;
        if (error.response.status === 400) {
          if (typeof data.message === "string") {
            if (data.message.startsWith("User")) {
              setEmailError(data.message);
            }
          } else {
            for (const msg of data.message) {
              const err = msg as string;
              if (msg.startsWith("email")) {
                setEmailError(err);
              } else if (msg.startsWith("password")) {
                setPasswordError(err);
              } else if (msg.startsWith("role")) {
                setRoleError(err);
              } else if (msg.startsWith("country")) {
                setCountryError(err);
              } else if (msg.startsWith("name")) {
                setNameError(err);
              }
            }
          }
        } else {
          setError("Something went wrong. Please try again later.");
        }
        return;
      }
      setError("Server error. Please try again later.");
      // console.log(error.response.data.message);
      // console.log(error.response.status);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSumit}
        className="flex flex-col  gap-4 bg-slate-100 rounded-md w-full md:w-[70%] lg:w-[50%] xl:w-[42%] 2xl:w-[30%] p-8 shadow-lg"
        action=""
      >
        <h2 className=" text-center text-[26px] font-bold ">Create new user</h2>
        {error ? (
          <p className="text-red text-center text-base first-letter:capitalize">
            {error}
          </p>
        ) : null}
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name :</label>
          <input
            required
            className="h-11 rounded-md  ring-1 ring-slate-300 outline-none pl-3"
            type="text"
            id="name"
            min={6}
            max={20}
            value={formFields.name}
            name="name"
            onChange={handleChange}
          />
          {nameError ? (
            <p className="text-red pl-2 text-base first-letter:capitalize">
              {nameError}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email :</label>

          <input
            className="h-11 rounded-md  pl-3 ring-1 ring-slate-300 outline-none"
            type="email"
            id="email"
            required
            value={formFields.email}
            name="email"
            onChange={handleChange}
          />
          {emailError ? (
            <p className="text-red pl-2 text-base first-letter:capitalize">
              {emailError}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password :</label>
          <input
            required
            className="h-11 rounded-md  pl-3 ring-1 ring-slate-300 outline-none"
            type="password"
            id="password"
            min={6}
            max={20}
            value={formFields.password}
            name="password"
            onChange={handleChange}
          />
          {passwordError ? (
            <p className="text-red pl-2 text-base first-letter:capitalize">
              {passwordError}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="role">Role :</label>
          <select
            required
            className="h-11 rounded-md ring-1 ring-slate-300   pl-3 outline-none"
            name="role"
            id="role"
            value={formFields.role}
            onChange={handleChange}
          >
            <option disabled value={""}>
              Select a role
            </option>
            <option value="player">Player</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
          {roleError ? (
            <p className="text-red pl-2 text-base first-letter:capitalize">
              {roleError}
            </p>
          ) : null}
        </div>
        {formFields.role === "player" ? (
          <div className="flex flex-col gap-1">
            <label htmlFor="country">Country :</label>
            <select
              required
              className="h-11 rounded-md ring-1 ring-slate-300   pl-3 outline-none"
              name="country"
              id="country"
              value={formFields.country}
              onChange={handleChange}
            >
              <option disabled value={""}>
                Select a country.
              </option>
              {Object.values(Country).map((country, index) => {
                return (
                  <option key={index + 1} value={country}>
                    {CountryMap.get(country)}
                  </option>
                );
              })}
            </select>
            {countryError ? (
              <p className="text-red pl-2 text-base first-letter:capitalize">
                {countryError}
              </p>
            ) : null}
          </div>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500  py-3 rounded-md text-white hover:bg-blue-600"
        >
          {loading ? <Loader /> : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateUsers;
