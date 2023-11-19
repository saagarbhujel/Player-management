import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CountryMap, Player } from "../../types";
import Loader from "../../components/Loader";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // console.log(user.id, userId);

  // Inside your component
  const handleFetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get(`/player/${userId}`);
      console.log(res);
      const data: Player = res.data;
      setPlayerData(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [axiosPrivate, userId]);

  useEffect(() => {
    handleFetchUser();
  }, [handleFetchUser]);

  if (isLoading && !playerData) {
    return (
      <div className="w-full flex-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt=" profile"
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />

          <div>
            <div>
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full first-letter:capitalize">
                {playerData?.name}
              </h1>
              <p className="small-regular md:body-medium text-center xl:text-left text-light-3 ">
                {CountryMap.get(playerData?.country)}
              </p>
              <p className="small-regular md:body-medium text-center xl:text-left text-light-3 ">
              {playerData?.active ? (
                              <span className="text-green-500">Active</span>
                            ) : (
                              <span className="text-red-500">Inactive</span>
                            )}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <div className={`${user.id !== userId && "hidden"}`}>
                <Link to={`/update-profile/${userId}`} 
                className={`h-12 bg-gray-700/20 mt-2 px-5 flex-center gap-2 rounded-lg ${user.id !== userId && "hidden"}`}
                >
                <img src="/assets/icons/edit.svg" alt="Edit" />
                <p>Edit Profile</p>
                </Link>
              </div>
            </div>

            <div className="flex flex-col mt-6 items-center justify-center w-full xl:justify-start flex-wrap z-20 bg-blue-500/20 p-5 rounded-md">
              <p className="w-full"><span>Experience Points: </span>{playerData?.statistics.experience_point}</p>
              <p className="w-full"><span>Game Played: </span>{playerData?.statistics.games_played}</p>
              <p className="w-full"><span>Games Won: </span>{playerData?.statistics.games_won}</p>
              <p className=" w-full"><span>Coins Earned: </span>${playerData?.statistics.coins}</p>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
