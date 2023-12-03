import { useEffect, useRef } from "react";
import useSearch from "../hooks/useSearch";
import Pagination from "./Pagination";

const SearchBar = () => {
  const {
    country,
    setCountry,
    search,
    setSearch,
    searchResult,
    meta,
    setPage,
    isListVisible,
    setIsListVisible,
    loading,
  } = useSearch();

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


    // Event handler for focusing on the input field
    const handleInputFocus = () => {
      if (searchResult.length > 0 && search.trim() !== "") {
        setIsListVisible(true);
      }
    };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
    
      if (
        !listRef.current?.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsListVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  return (
    <div className=" relative ">
      <div className="flex">
        <select
          id="country"
          name="country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="block outline-none rounded-l-md border w-18 bg-blue-200 px-2 py-1.5 text-gray-900 shadow-sm border-gray-400 border-r-0   sm:text-sm sm:leading-6"
        >
          <option value={""} disabled>
            Select Country
          </option>
          <option value={"np"}>Nepal</option>
          <option value={"in"}>India</option>
          <option value={"us"}>USA</option>
          <option value={"au"}>Australia</option>
          <option value={"af"}> Afganistan </option>
        </select>
        <input
          ref={inputRef}
          value={search}
          onFocus={handleInputFocus}
          placeholder="Search Player"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="border rounded-md border-gray-400 border-l-0 pl-2 rounded-l-none outline-none py-2 w-[24vw]"
        />
      </div>

      <div
        ref={listRef}
        className="absolute w-full mt-2 bg-green-200 rounded-md "
      >
        {searchResult.length > 0 && isListVisible ? (
          <>
            <ul className=" max-h-56 min-h-min overflow-y-auto ">
              {searchResult.map((player, index) => (
                <li
                  key={index}
                  className="flex  hover:bg-green-400 py-3 justify-between pr-2 group pl-2"
                >
                  <span>{player.name}</span>
                  <span className="group-hover:text-gray-100">
                    {player.statistics.experience_point}
                  </span>
                </li>
              ))}
            </ul>
            {meta ? (
              <Pagination
                className="flex justify-center bg-green-400 py-1"
                meta={meta}
                onPrev={() => setPage((prev) => prev - 1)}
                onNext={() => setPage((prev) => prev + 1)}
              />
            ) : null}
          </>
        ) : search !== "" && !loading && isListVisible ? (
          <div
            ref={listRef}
            className="absolute mt-2 rounded-md w-full bg-blue-100"
          >
            <div className="p-4 text-gray-800">No search results</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
