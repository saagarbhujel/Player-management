import React, { useEffect, useState } from "react";
import { PageMeta, Player } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import Loader from "../../components/Loader";
import PlayerCard from "../../components/PlayerCard";
import Pagination from "../../components/Pagination";

const ManagePlayers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setToast } = useToast();

  const [players, setPlayers] = React.useState<Player[]>([]);

  const [meta, setMeta] = useState({} as PageMeta);
  const [searchParam, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(searchParam.get("page"));
  const [loading, setLoading] = useState(false);

  const fetchPlayer = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get(
        `/user/players/all?pageSize=6&page=${!page?.match(/^\d+$/) ? 1 : page}`
      );

      if (res.status === 200) {
        const data: Player[] = res.data.data;
        const meta: PageMeta = res.data.meta;

        setPlayers(data);
        setMeta(meta);
      }
    } catch (error) {
      setToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!page) return;
    setSearchParam({ page });
  }, [page]);

  useEffect(() => {
    fetchPlayer();
  }, [searchParam]);

  document.title = "Player Management-Manage Players";
  return (
    <div className=" flex flex-col gap-6 justify-center items-center mt-8 pl-5 pr-5">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Players</h2>
        {loading && !players ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {players.map((player, index) => {
              // console.log(player,"tala");

              return (
                <PlayerCard
                  key={index}
                  player={player}
                  setPlayers={setPlayers}
                  players={players}
                />
              );
            })}
          </ul>
        )}
      </div>
      {meta ? (
        <Pagination
          meta={meta}
          onNext={() => setPage((meta.currentPage + 1).toString())}
          onPrev={() => setPage((meta.currentPage - 1).toString())}
          onFirstPage={() => setPage("1")}
          onLastPage={() => setPage(meta.totalPages.toString())}
        />
      ) : null}
    </div>
  );
};

export default ManagePlayers;
