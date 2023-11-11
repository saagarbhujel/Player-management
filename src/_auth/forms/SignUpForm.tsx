import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const isDisabled = !email || !password || !userName || !country;
    
    
    return (
      <section
        className={
          "flex flex-col justify-center items-center h-screen w-screen"
        }
      >
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account.
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          Welcome ! Please Signup to use Player Management.
        </p>

        <form className="  md:w-1/6 ">
          <div className="flex flex-col mt-4">
            <label className="pl-1" htmlFor="email">
              Username :
            </label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              id={"email"}
              className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="pl-1" htmlFor="email">
              Email :
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id={"email"}
              className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="pl-1" htmlFor="email">
              Country :
            </label>
            <select
              onChange={(e) => setCountry(e.target.value)}
              name="cars"
              id="cars"
              className=" h-9 pl-2  rounded-md"
            >
              <option>Choose a country</option>
              <option value="np">Nepal</option>
              <option value="us">United States</option>
              <option value="in">India</option>
              <option value="af">Afganistan</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label className="pl-1" htmlFor="password">
              Password :
            </label>
            <input
              type="password"
              id={"password"}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out"
            />
          </div>
          <button
            type={"submit"}
            disabled={isDisabled}
            className="  bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-md px-4 py-2"
          >
            SignUp
          </button>

          <p className="text-small-regular text-light-4 text-center mt-4">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-blue-500 text-small-semibold ml-1"
            >
              SignIn
            </Link>
          </p>
        </form>
      </section>
    );
};

export default SignUpForm;