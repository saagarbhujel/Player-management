import LeftSideBar from "../components/LeftSideBar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <LeftSideBar />

      <section className="flex flex-col flex-1 h-full">
        <NavBar />
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
