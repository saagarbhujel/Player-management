import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Missing = () => {
  const {auth} = useAuth();
    document.title = "404 | Page Not Found";
  return (
    <article className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className=" uppercase text-2xl font-bold">Opps! </h1>
      <p className="font-semibold text-xl">Page not found</p>
      {
        !auth.accessToken ? (
          <Link
        to={"/sign-in"}
        className="flex gap-2 px-6 py-3 rounded-md text-white bg-blue-500/90 hover:bg-blue-500 mt-4"
      >
        <img src="/assets/icons/home.svg" alt="home" className="invert-white" />
        Sign In
      </Link>
        ): (
          <Link
          to={"/"}
          className="flex gap-2 px-6 py-3 rounded-md text-white bg-blue-500/90 hover:bg-blue-500 mt-4"
        >
          <img src="/assets/icons/home.svg" alt="home" className="invert-white" />
          Visit Home
        </Link>
        )
      }
   
    </article>
  );
};

export default Missing;
