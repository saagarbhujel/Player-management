import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useDebounce from "./useDebounce";
import { PageMeta, Player } from "../types";

const useSearch = () => {
  const axiosPrivate = useAxiosPrivate();

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [meta, setMeta] = useState({} as PageMeta);
  const [searchResult, setSearchResult] = useState([] as Player[]);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const searchReasult = async () => {
      try {
        const res = await axiosPrivate.get(
          `/user/players/all?country=${country}&pageSize=10&page=1&searchKey=${debouncedSearch}`
        );
        const players: Player[] = res.data.data;
        // console.log(players);
        setSearchResult(players);
        // console.log(res);
        const meta: PageMeta = res.data.meta;
        setMeta(meta);
      } catch (error) {
        console.log(error);
      }
    };
    if (debouncedSearch) {
      searchReasult();
    }
  }, [debouncedSearch]);

  return {
    setSearch,
    search,
    setCountry,
    country,
    searchResult,
    meta,
  };
};

export default useSearch;
