import { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import AddRoom from "../../components/Chats/AddRoom";
import { useParams } from "react-router-dom";
import useChat from "../../hooks/useChat";
import RoomChat from "../../components/Chats/RoomChat";
import { IoIosLogOut } from "react-icons/io";
import ConformModal from "./ConformModal";

const Chats = () => {
  // const {getRooms, rooms, socket} = useSocket();
  const { roomName, userId } = useParams();
  const { getRooms, rooms, socket, leaveRoom } = useChat();

  const [showRightNav, setShowRightNav] = useState(false);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLeaveRoomModalOpened, setIsLeaveRoomModalOpened] = useState(false);

  const loadRooms = async () => {
    setIsLoadingRooms(true);
    await getRooms();
    setIsLoadingRooms(false);
  };
  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    socket?.on("message", ({ message }: { message: string }) => {
      const jsonMessage = JSON.parse(message);
      //when new room is created refresh list
      if (jsonMessage.event === "create_room") {
        getRooms();
      }

      //when room is leave refresh list
      if(jsonMessage.event === 'leave_room'){
        if(jsonMessage.roomName){
          getRooms()
        }
      }
    });


    return () => {
      socket?.off("message");
    };
  }, [socket]);

  document.title = "Player Management-Chats";
  return (
    <div className="w-full  min-h-full  h-[calc(100vh-5rem)] relative z-20  ">
      <nav className="flex justify-between items-center  w-full h-16  bg-primary-500 px-5  ">
        <h1 className="text-2xl font-semibold">
          {roomName ? roomName : "Chats"}
        </h1>

        <div className=" flex  gap-4">
          <button
            className={`${
              !roomName ? "hidden" : "block"
            } text-[26px] text-white`}
            onClick={() => {
              setIsLeaveRoomModalOpened(true);
            }}
          >
            <IoIosLogOut />
          </button>

          <button
            className="text-[26px] text-white"
            onClick={() => {
              setShowRightNav(!showRightNav);
            }}
          >
            <IoInformationCircleOutline />
          </button>
        </div>
      </nav>

      {/* right Side nav */}
      <div
        className={`${
          showRightNav ? "translate-x-0" : "translate-x-full "
        } top-16 right-0  md:w-[18vw] bg-gray-200 h-full rounded-br-lg  fixed ease-in-out duration-300 z-30`}
      >
        <div className=" flex pl-2 pr-2 my-4">
          <AddRoom
            className="flex shadow-md "
            inputStyles="px-1 py-3 outline-none rounded-l-md text-gray-800"
            inputPlaceholder={"Enter Room"}
            buttonStyles=" rounded-r-md text-md px-2 text-white hover:text-black bg-blue-500  hover:bg-blue-400 "
            buttonText={"Add Room "}
            rooms={rooms}
            isLoadingRooms={isLoadingRooms}
            hideRoomsList={() => setShowRightNav(false)}
          />
        </div>
      </div>

      {/* message section */}
      {roomName ? (
        <RoomChat roomName={roomName} />
      ) : userId ? (
        "hello"
      ) : (
        <div className=" h-[calc(100vh-5rem)] sm:flex  w-full rounded-e-lg">
          <div className="flex flex-col justify-center items-center h-full w-full">
            <span className=" text-rose-800 font-bold text-2xl">Tips</span>
            <div className="flex flex-col">
              <ul className="list-disc list-inside md:text-lg text-gray-800">
                <li>
                  <span>1.</span> Hover over some else's message to join private
                  chat.
                </li>
                <li>
                  <span>2.</span> Start Conversation by joining a room.
                </li>
                <li>
                  <span>3.</span> Hover over your message to update it.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {
        <ConformModal
        className="top-[45vh] left-[50rem]"
          isOpened={isLeaveRoomModalOpened}
          message={`This action will delete the room`}
          onConfirm={() => {
            setIsLeaveRoomModalOpened(false);
            leaveRoom(roomName || "default");
          }}
          onReject={() => {
            setIsLeaveRoomModalOpened(false);
          }}
        />
      }
    </div>
  );
};

export default Chats;
