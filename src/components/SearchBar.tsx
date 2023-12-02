import useSearch from "../hooks/useSearch";

const SearchBar = () => {
  const { country, setCountry, search, setSearch, searchResult } = useSearch();

  return (
    <div className=" relative ">
        <div className="flex">

      <select
        id="country"
        name="country"
        required
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="block outline-none rounded-l-md border px-2 py-1.5 text-gray-900 shadow-sm border-black border-r-0   sm:text-sm sm:leading-6"
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="border rounded-md border-black border-l-0 pl-2 rounded-l-none outline-none py-2"
      />
        </div>

      <div className="absolute w-full mt-2 bg-green-500/60 rounded-md ">
        <ul className="max-h-48 min-h-min overflow-y-auto ">
          {searchResult.map((player, index) => (
            <li key={index} className="flex  text-white hover:bg-green-500 py-3 justify-between pr-2 group pl-2">
                <span>{player.name}</span>
                <span className="group-hover:text-gray-100">{player.statistics.experience_point}</span>
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
