import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader";
import { useToast } from "../../hooks/useToast";

const Games = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { setToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePlayGame = async () => {
    // console.log('play game')
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/player/play/game");
      // console.log(res.data.message);
      const message = res.data.message;
      setToast(message, "info");
    } catch (error) {
      // console.log(error);
      setToast("Something went wrong. Please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`${user.role !== "player" && "hidden"}`}>
        <button
          onClick={handlePlayGame}
          className=" px-8 py-3 bg-blue-500/50 hover:bg-blue-500/60 rounded-lg"
        >
          {isLoading ? <Loader /> : "Play"}
        </button>
      </div>
    </div>
  );
};

export default Games;
