import { useState } from "react";
import { NavLink } from "react-router-dom";

const SignInForm = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isDisabled = !email || !password;

 

    return (
        <section className={"flex flex-col justify-center items-center h-screen w-screen"}>
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                Login to your account.
            </h2>
            <p className="text-light-3 small-medium md:base-regular">
                Welcome back! Please login to your account.
            </p>
            <form  className="  md:w-1/6 ">
                <div className="flex flex-col mt-4" >
                    <label className="pl-1" htmlFor="email">Email :</label>
                    <input type="email" onChange={(e)=> setEmail(e.target.value)} id={'email'} className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out" />
                </div>
                <div className="flex flex-col mt-4" >
                    <label className="pl-1" htmlFor="password">Password :</label>
                    <input type="password" id={'password'}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out" />
                </div>
                <button type={'submit'} disabled={isDisabled} className="  bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-md px-4 py-2">
                    Login
                </button>

                <p className="text-small-regular text-light-4 text-center mt-4">
                    Don&apos;t have an account?
                    <NavLink to='/sign-up' className="text-blue-500 text-small-semibold ml-1">SignUp</NavLink>
                </p>
            </form>
        </section>
    );
};

export default SignInForm;