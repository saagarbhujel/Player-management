import LeftSideBar from "../components/LeftSideBar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import SSENotification from "../components/SSENotification";
import { useRef } from "react";
import Loader from "../components/Loader";

const RootLayout = () => {
  const {isLoading,user} = useAuth()
  const isLayoutReady = useRef(false)
  if (!isLoading) isLayoutReady.current = true

  if (isLoading && !isLayoutReady.current) {
    return <Loader />;
  }
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
