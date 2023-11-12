/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";


const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [country, setCountry] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  

  const reserError =()=>{
    setErrorMsg("");
    setEmailError("");
    setPasswordError("");
    setUserNameError("");
  }

  const handleSiginUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reserError();


    try {
      const response = await axios.post('/player', ({
        name: userName,
        email,
        password,
        country
       }))

    } catch (error: any) {
      if( error.response.data.status !== 201 ){
        let errMsg:string | string[] = error.response.data.message;
        console.log(errMsg);

        if (!Array.isArray(errMsg)) {
          errMsg = [errMsg];
        }
         errMsg.forEach((err: string) => {
          if(err.startsWith('email')){
            setEmailError(err);
            console.log(emailError);
          }
          else if(err.startsWith('password')){
            setPasswordError(err);
            console.log(passwordError, "password error");  
          }
          else if(err.startsWith('name')){
            setUserNameError(err);
            console.log(userNameError);
            
          } else{
            setErrorMsg('Invalid credentials.')
            console.log('Invalid credentials.');
            
          }
        });
        
        return;
      } else if (error.response.data.status === 404) {
        setErrorMsg('Invalid credentials.')
      } else {
        setErrorMsg('Server error.')
      }
  }
   }
  
     
     
     
   
 
      
      
    

  return (
    <section
      className={"flex flex-col justify-center items-center h-screen w-screen"}
    >
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Create a new account.
      </h2>
      <p className="text-light-3 small-medium md:base-regular">
        Welcome ! Please Signup to use Player Management.
      </p>
      {
        errorMsg && <p className="text-red first-letter:capitalize">{errorMsg}</p>
      }
      <form onSubmit={handleSiginUp} className="  md:w-1/6 ">
        {/* Username */}
        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="username">
            Username :
          </label>

          <input
            type="text"
            onChange={(e)=>setUserName(e.target.value)}
            name="username"
            value={userName}
            required
            min={3}
            max={15}
            id={"username"}
            className={`border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out`}
          />
          {userNameError ? <p className="text-red first-letter:capitalize">{userNameError}</p> : null}
        </div>

        {/* Email */}
        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id={"email"}
            className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out"
          />
          {emailError && <p className="text-red first-letter:capitalize">{emailError}</p>}
        </div>

        {/* Country */}
        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="country">
            Country :
          </label>
          <select
            onChange={({ target }) => {
              setCountry(target.value);
            }}
            name="country"
            required
            value={country}
            id="country"
            className=" h-9 pl-2  rounded-md"
          >
            <option>Choose a country</option>
            <option value="np">Nepal</option>
            <option value="us">United States</option>
            <option value="in">India</option>
            <option value="af">Afganistan</option>
          </select>
          
        </div>

        {/* Password */}
        <div className="flex flex-col mt-4">
          <label className="pl-1" htmlFor="password">
            Password :
          </label>

          <input
            type="password"
            name="password"
            required
            min={8}
            max={24}
            value={password}
            id={"password"}
            onChange={(e)=>setPassowrd(e.target.value)}
            className="border border-gray-300  h-9 pl-2 rounded-md font-light text-sm  outline-none focus:border-blue-300 focus:ring-4 ring-blue-500/20  transition-all ease-in-out"
          />
          {passwordError ? <p className="text-red first-letter:capitalize">{passwordError}</p> : null}
        </div>

        {/* Button */}
        <button
          type={"submit"}
          //  disabled={!validUserName || !validEmail || !validPassword}
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
