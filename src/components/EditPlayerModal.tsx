import { Dispatch, SetStateAction } from "react";
import { Country, CountryMap, Player } from "../types";
import Modal from "./Modal";
import Loader from "./Loader";

type EditPlayerProps = {
  isOpened: boolean;
  onReject: () => void;
  message: string;
  onConfirm: () => void;
  className?: string;
  setEditPlayer: Dispatch<SetStateAction<Player>>;
  editPlayer: Player;
  loading: boolean;
};

const EditPlayerModal = ({
  isOpened,
  onReject,
  message,
  onConfirm,
  className,
  setEditPlayer,
  editPlayer,
  loading
}: EditPlayerProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPlayer({ ...editPlayer, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value as unknown as Country; // Cast the string to the Country type
    setEditPlayer({ ...editPlayer, country: selectedCountry });
  };
  return (
    <Modal isOpened={isOpened} onCancel={onReject} className={className}>
      <div className="flex flex-col gap-7 ">
        <span className="text-md">{message}</span>
        <form className="flex flex-col justify-center gap-2">
          <div className="flex flex-col gap-1">
            <label className=" text-left pl-2" htmlFor="name">
              Name :
            </label>

            <input
              className="h-11 rounded-md  pl-3 ring-1 ring-slate-300 outline-none"
              type="text"
              id="name"
              name={"name"}
              value={editPlayer.name}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className=" text-left pl-2" htmlFor="country">
              Country :
            </label>
            <select
              required
              className="h-11 rounded-md ring-1 ring-slate-300   pl-3 outline-none"
              name="country"
              id="country"
              value={editPlayer.country}
              onChange={handleSelectChange}
              onClick={(e) => e.stopPropagation()}
            >
              <option disabled value="">
                Select a country.
              </option>
              {Object.values(Country).map((country, index) => {
                return (
                  <option key={index + 1} value={country}>
                    {CountryMap.get(country)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-1 justify-end w-full mt-2">
            <button
              type="button"
              className="py-2 px-4 rounded-md text-white  bg-blue-500"
              onClick={onConfirm}
            >
              {
                loading ? <Loader/> : "Update"
              }
             
            </button>
            <button
              type="button"
              className="py-2 px-4 rounded-md text-white bg-orange-600 "
              onClick={onReject}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPlayerModal;
