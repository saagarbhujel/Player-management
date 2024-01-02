import { FC, useState } from "react";
import { cn } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Room } from "../../types";
import Loader from "../Loader";

type AddRoomProps = {
  className?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  inputStyles?: string;
  buttonStyles?: string;
  rooms: Room[];
  isLoadingRooms: boolean;
  hideRoomsList: () => void
};

const AddRoom: FC<AddRoomProps> = ({
  className,
  inputPlaceholder,
  buttonText,
  inputStyles,
  buttonStyles,
  rooms,
  isLoadingRooms,
  hideRoomsList
}: AddRoomProps) => {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");

  return (
    <div className="flex flex-col">
      <form
        className={cn(className)}
        onSubmit={(e) => {
          e.preventDefault();
          setRoomName((_) => "");
          navigate(`/chats/room/${roomName}`);
        }}
      >
        <input
          type="text"
          id='roomName'
          className={inputStyles}
          placeholder={inputPlaceholder}
          value={roomName}
          name="roomName"
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <button type="submit" className={buttonStyles}>
          {buttonText}
        </button>
      </form>

      <div className="mt-4">
        <h2 className=" font-semibold text-lg text-center pb-3">
          <span>Available Rooms</span>
        </h2>

        <div className="h-[calc(100vh-40rem)] overflow-y-auto scroll-smooth ">
          {isLoadingRooms ? (
            <Loader />
          ) : rooms.length ? (
            rooms.map((room) => (
              <button
                key={room.name}
                type="button"
                className="bg-green-500 hover:bg-green-600 w-full  h-12 rounded-md text-white mt-2  "
                onClick={()=>{
                  hideRoomsList()
                  navigate(`/chats/room/${room.name}`)
                }}
              >
                {room.name}
              </button>
            ))
          ) : (
            <div>No room found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
