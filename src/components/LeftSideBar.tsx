import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { adminSidebarLinks, sidebarLinks } from "../constants";
import { CountryMap, INavLink } from "../types";
import { useState } from "react";
import ConformModal from "../_root/pages/ConformModal";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import useDetails from "../hooks/useDetails";
import { IoMdClose } from "react-icons/io";

const LeftSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuth();
  const role = user.role;

  const detailsWrapper = useDetails();
  const playerDetails = detailsWrapper.details;

  // console.log( playerDetails);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(false);



  if (role === "player") {
    return (
      <>
      <nav className="leftsidebar max-h-full bg-gray-100">
        <div className=" flex flex-col gap-11">
          {!user.id ? (
            <div className=" h-14">
              <Loader />
            </div>
          ) : (
            <Link
              to={`/profile/${user.id}`}
              className="flex gap-3 items-center"
            >
              {!playerDetails ? (
                <Loader />
              ) : (
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
              )}
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
          className="flex gap-4 items-center p-4 bg-orange-400/90 rounded-md hover:bg-orange-500"
          onClick={() => {
            setIsLogoutModalOpen(true);
          }}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className=" small-medium lg:base-medium">Logout</p>
        </button>
      </nav>

      
        {/* // mobile nav */}
        <section className="md:hidden " >
          <div className="flex  absolute z-30  md:hidden justify-between items-center top-0  h-16   px-5  ">

          <button
          className={` text-2xl `}
          onClick={()=>{
            setIsLeftSideBarOpen(!isLeftSideBarOpen)
          }}>
             ☰
          </button>
          </div>


          <div 
          className={`${isLeftSideBarOpen ?"translate-x-0 " : "  translate-x-[-100%]"} left-0  transition-all fixed duration-300  h-full  z-30 `}
          >
           
          <nav className="flex px-6 py-10 flex-col justify-between min-w-[220px] max-h-full  bg-gray-100 h-full">
          <div className=" absolute right-0 top-0 m-2 p-1">
             <button 
             className="text-2xl"
             onClick={()=>{
              setIsLeftSideBarOpen(!isLeftSideBarOpen)
             }}
             >
          <IoMdClose />
             </button>
            </div>
        <div className=" flex flex-col gap-11">
          {!user.id ? (
            <div className=" h-14">
              <Loader />
            </div>
          ) : (
            <Link
              to={`/profile/${user.id}`}
              className="flex gap-3 items-center"
            >
              {!playerDetails ? (
                <Loader />
              ) : (
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
              )}
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
          className="flex gap-4 items-center p-4 bg-orange-400/90 rounded-md hover:bg-orange-500"
          onClick={() => {
            setIsLogoutModalOpen(true);
          }}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className=" small-medium lg:base-medium">Logout</p>
        </button>

      </nav>
          </div>

        </section>
        <ConformModal
          className=" left-[5rem] top-[45vh] md:left-[50rem]"
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

        </>
    );
  }

  if (role === "admin" || role === "staff") {
    return (
      <>
      
      <nav className="leftsidebar max-h-full bg-gray-100">
        <div className=" flex flex-col gap-11">
          {!user.id ? (
            <div className=" h-14">
              <Loader />
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <div className=" w-12 h-12 rounded-full">
                <img
                  src="/assets/icons/profile-placeholder.svg"
                  alt="profile"
                />
              </div>
              <div className="flex flex-col">
                <p className="body-bold first-letter:capitalize">{role}</p>
              </div>
            </div>
          )}

          <ul>
            {adminSidebarLinks.map((link: INavLink, index) => {
              const isActive = pathname === link.route;
              return (
                <li
                  className={`leftsidebar-link group ${
                    isActive && "bg-primary-500"
                  }`}
                  key={index}
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
          className="flex gap-4 items-center p-4 bg-orange-400/90 rounded-md hover:bg-orange-500 "
          onClick={() => {
            setIsLogoutModalOpen(true);
          }}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className=" small-medium lg:base-medium">Logout</p>
        </button>

       

        
      </nav>


      {/* // mobile nav */}
      <section className="md:hidden " >
          <div className="flex  absolute z-30  md:hidden justify-between items-center top-0  h-16   px-5  ">

          <button
          className={` text-2xl `}
          onClick={()=>{
            setIsLeftSideBarOpen(!isLeftSideBarOpen)
          }}>
             ☰
          </button>
          </div>


          <div 
          className={`${isLeftSideBarOpen ?"translate-x-0 " : "  translate-x-[-100%]"} left-0  transition-all fixed duration-300  h-full  z-30 `}
          >
           
          <nav className="flex px-6 py-10 flex-col justify-between min-w-[220px] max-h-full  bg-gray-100 h-full">
          <div className=" absolute right-0 top-0 m-2 p-1">
             <button 
             className="text-2xl"
             onClick={()=>{
              setIsLeftSideBarOpen(!isLeftSideBarOpen)
             }}
             >
          <IoMdClose />
             </button>
            </div>
        
     
            <div className=" flex flex-col gap-11">
          {!user.id ? (
            <div className=" h-14">
              <Loader />
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <div className=" w-12 h-12 rounded-full">
                <img
                  src="/assets/icons/profile-placeholder.svg"
                  alt="profile"
                />
              </div>
              <div className="flex flex-col">
                <p className="body-bold first-letter:capitalize">{role}</p>
              </div>
            </div>
          )}

          <ul>
            {adminSidebarLinks.map((link: INavLink, index) => {
              const isActive = pathname === link.route;
              return (
                <li
                  className={`leftsidebar-link group ${
                    isActive && "bg-primary-500"
                  }`}
                  key={index}
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
          className="flex gap-4 items-center p-4 bg-orange-400/90 rounded-md hover:bg-orange-500 "
          onClick={() => {
            setIsLogoutModalOpen(true);
          }}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className=" small-medium lg:base-medium">Logout</p>
        </button>

        
      </nav>
          </div>

        </section>
        <ConformModal
          className="left-[5rem] top-[45vh] md:left-[50rem]"
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
      </>
    );
  }
};

export default LeftSideBar;
