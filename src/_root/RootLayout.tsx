import LeftSideBar from "../components/LeftSideBar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import SSENotification from "../components/SSENotification";

const RootLayout = () => {
  const {user} = useAuth()
  return (
    <div className="w-full md:flex">
      <LeftSideBar />

      <section className="flex flex-col flex-1 h-full">
        {
          user.role === "player" ? <SSENotification /> : null
        }
        <NavBar />
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
