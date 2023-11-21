import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../constants";
import { CountryMap, INavLink } from "../types";
import { useState } from "react";
import ConformModal from "../_root/pages/ConformModal";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import useDetails from "../hooks/useDetails";

const LeftSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuth();
  const detailsWrapper = useDetails();
  const playerDetails = detailsWrapper.details;

  // console.log( playerDetails);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  return (
    <nav className="leftsidebar max-h-full">
      <div className=" flex flex-col gap-11">
        {!user.id ? (
          <div className=" h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
              {
                !playerDetails ? (<Loader/>) : (
                  <>
            <div className="bg-gray-500 w-12 h-12 rounded-full" />
            <div className="flex flex-col">
                  <p className="body-bold first-letter:capitalize">
                {playerDetails?.name}
              </p>
              <p className="small-regular text-light-3">
                {CountryMap.get(playerDetails?.country)}
              </p>
            </div>
                  </>
                )
              }
          </Link>
        )}

        <ul>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}
              >
                <NavLink
                  className={"flex gap-4 items-center p-4"}
                  to={link.route}
                >
                  {/* <img src={link.imageUrl} alt={link.label} className={` group-hover:invert-white ${isActive && 'invert-white'}`} /> */}
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className="shad-button_ghost"
        onClick={() => {
          setIsLogoutModalOpen(true);
        }}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className=" small-medium lg:base-medium">Logout</p>
      </button>

      <ConformModal
        className="top-[45vh] left-[50rem]"
        isOpened={isLogoutModalOpen}
        message="Are you sure you want to logout?"
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          logout();
          navigate("/sign-in");
        }}
        onReject={() => {
          setIsLogoutModalOpen(false);
        }}
      />
    </nav>
  );
};

export default LeftSideBar;
