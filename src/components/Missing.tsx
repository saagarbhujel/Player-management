import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className=" uppercase text-2xl font-bold">Opps! </h1>
      <p className="font-semibold text-xl">Page not found</p>
      <Link
        to={"/"}
        className="flex gap-2 px-6 py-3 rounded-md text-white bg-blue-500/90 hover:bg-blue-500 mt-4"
      >
        <img src="/assets/icons/home.svg" alt="home" className="invert-white" />
        Visit Home
      </Link>
    </article>
  );
};

export default Missing;
