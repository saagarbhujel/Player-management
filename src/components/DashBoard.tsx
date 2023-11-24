import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import { useToast } from "../hooks/useToast";

const DashBoard = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { setToast } = useToast();

  const [userCount, setUserCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [isLoadingUserCount, setIsLoadingUserCount] = useState(false);

  const fetchUsers = async () => {
    setIsLoadingUserCount(true);
    try {
      const response = await axiosPrivate.get("/user?pageSize=1&page=1");
      // console.log(response);
      if (response.statusText === "OK") {
        // console.log(response.data.meta.totalItems);
        setUserCount(response.data.meta.totalItems);
      }
    } catch (error) {
      // console.log(error);
      setToast("Something went wrong. Please try again later.", "error");
    } finally {
      setIsLoadingUserCount(false);
    }
  };

  const fetchPlayers = async () => {
    setIsLoadingUserCount(true);
    try {
      const res = await axiosPrivate.get('/user/players/all?pageSize=1&page=1')
      // console.log(res);
      if(res.statusText === 'OK') {
        setPlayerCount(res.data.meta.totalItems)
      }
      
    } catch (error) {
      setToast("Something went wrong. Please try again later.", "error");
      
    }finally {
      setIsLoadingUserCount(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchPlayers();
  }, [user.role]);
  return (
    <div>
      {isLoadingUserCount ? (
        <Loader />
      ) : (
        <>
          <div>
              <h2 className=" uppercase p-8 font-bold text-[28px]">DashBoard</h2>
            <div className="flex gap-6 flex-col lg:flex-row  justify-center items-center h-[82vh] w-full drop-shadow-md ">
              <div className=" flex gap-8  bg-gradient-to-r from-blue-300 to-orange-200 place-items-center p-6 rounded-md  w-[80vw] md:w-[50vw] lg:w-[26vw] xl:w-[24vw] 2xl:w-[21vw]">
              
                   {/* lg:w-[21vw] w-[80vw] */}
                <img
                  src="/assets/icons/people.svg"
                  alt="people"
                  width={80}
                  height={80}
                  className=" place-items-center p-2 rounded-full border border-gray-200  shadow-md"
                />
                <div className="flex flex-col gap-3 items-center">
                    <h2 className=" text-[26px] font-bold">Total Users</h2>
                    <p className="text-[24px] font-semibold">{userCount}</p>
                </div>
              </div>

              <div className=" flex gap-8 bg-gradient-to-r from-orange-200 to-blue-300 place-items-center p-6 rounded-md w-[80vw] md:w-[50vw] lg:w-[26vw] xl:w-[24vw] 2xl:w-[21vw]">
                <img
                  src="/assets/icons/people.svg"
                  alt="people"
                  width={80}
                  height={80}
                  className=" place-items-center  p-2 rounded-full border border-gray-400 shadow-md"
                />
                <div className="flex flex-col gap-3 items-center">
                    <h2 className="text-[26px] font-bold">Total Players</h2>
                    <p className="text-[24px] font-semibold">{playerCount}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
