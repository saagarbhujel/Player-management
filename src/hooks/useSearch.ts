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
  const [page, setPage] = useState(1);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchReasult = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(
          `/user/players/all?country=${country}&pageSize=10&page=${page}&searchKey=${debouncedSearch}`
        );
        const players: Player[] = res.data.data;
        // console.log(players);
        setSearchResult(players);
        // console.log(res);
        const meta: PageMeta = res.data.meta;
        setMeta(meta);

        if(debouncedSearch.length === 0) {
        setIsListVisible(false);
        }
        else{
          setIsListVisible(true);
        }
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    
      searchReasult();
  
  }, [debouncedSearch , page, country]);

 

  return {
    setSearch,
    search,
    setCountry,
    country,
    searchResult,
    meta,
    setPage,
    isListVisible, 
    setIsListVisible,
    loading,
    
  };
};

export default useSearch;
