import { useState } from "react";
import { CountryMap, Player } from "../types";
import Loader from "./Loader";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EditPlayerModal from "./EditPlayerModal";
import { useToast } from "../hooks/useToast";

type PlayerCardProps = {
  player: Player;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  players: Player[];
};

const PlayerCard = ({ player, setPlayers, players }: PlayerCardProps) => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { setToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false);
  const [editPlayer, setEditPlayer] = useState<Player>({} as Player);

  // console.log(player.active);

  const toogleActive = async (player: Player) => {
    setLoading(true);
    try {
      const res = await axiosPrivate.patch(
        `/user/player/setInactive/${player.id}`
      );
      // console.log(res);
      if (res.status === 200) {
        const playersClone = players?.map((p) =>
          p.id === player.id ? { ...p, active: !p.active } : p
        );
        setPlayers(playersClone);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    // console.log("update");
    setLoading(true);
    try {
      const res = await axiosPrivate.put(
        `/user/player/update/${editPlayer.id}`,
        {
          name: editPlayer.name,
          country: editPlayer.country,
        }
      );

      if (res.status === 200) {
        setToast(res.data.message, "success");
        setIsEditPlayerOpen(false);
        // console.log(res);
        const playerClone = players.map((p) =>
          p.id === editPlayer.id ? editPlayer : p
        );
        setPlayers(playerClone);
        setEditPlayer({} as Player);
      }
    } catch (error) {
      setToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!player && loading ? (
        <div className="flex justify-center  items-center min-h-[calc(100vh-8rem)]">
          <Loader />
        </div>
      ) : (
        <div className="border flex  md:flex-col p-4 gap-5 items-center rounded-md shadow-md pl-6">
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"
            className="rounded-full w-12 md:w-14 h-12 md:h-14 "
          />
          <div className="flex-1">
            <p className="text-[18px] md:text-center font-semibold first-letter:capitalize">
              {player.name}
            </p>
            <p className="text-[12px] md:text-center">
              {CountryMap.get(player.country)}
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                setEditPlayer(player);
                setIsEditPlayerOpen(true);
              }}
            >
              <img src="/assets/icons/edit.svg" alt="editPlayer" />
            </button>
          </div>

          <EditPlayerModal
            className="top-[30vh] left-[50rem] w-[25vw] h-[35vh]"
            isOpened={isEditPlayerOpen}
            message="Edit Player"
            onConfirm={() => {
              handleUpdate();
            }}
            onReject={() => setIsEditPlayerOpen(false)}
            setEditPlayer={setEditPlayer}
            editPlayer={editPlayer}
            loading={loading}
          />

          <div className="p-4">
            <h2 className={"hidden md:block mb-2"}>Status</h2>
            <button
              onClick={() => toogleActive(player)}
              className={`${
                user.role === "admin" ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="relative">
                <div
                  className={`${
                    player.active ? "bg-emerald-400" : "bg-rose-400"
                  } w-8 h-4 rounded-full shadow-inner`}
                />
                <div
                  className={`${
                    player.active
                      ? "bg-emerald-400 right-0"
                      : "bg-rose-400 left-0"
                  }  absolute  w-4 h-4 bg-white rounded-full shadow top-0 transition`}
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerCard;
