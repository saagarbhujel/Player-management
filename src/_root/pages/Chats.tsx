import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import AddRoom from "../../components/AddRoom";
import { useParams } from "react-router-dom";

const Chats = () => {

  // const {getRooms, rooms, socket} = useSocket();
  const {roomName} = useParams()

  const [showRightNav, setShowRightNav] = useState(false);

  

  document.title = "Player Management-Chats";
  return (
    <div className="w-full  min-h-full  h-[calc(100vh-5rem)] relative z-20  ">
      <nav className="flex justify-between items-center  w-full h-16  bg-primary-500 px-5  ">
        <h1 className="text-2xl font-semibold">Chats</h1>
        

        <button
          className="text-[26px] text-white"
          onClick={() => {
            setShowRightNav(!showRightNav);
          }}
        >
          <IoInformationCircleOutline />
        </button>
      </nav>

          {/* right Side nav */}
      <div
        className={`${
          showRightNav ? "translate-x-0" : "translate-x-full "
        } top-16 right-0  md:w-[18vw] bg-gray-200 h-full rounded-br-lg  fixed ease-in-out duration-300`}>
      
       <div className=" flex pl-2 pr-2 my-4">
       <AddRoom className="flex shadow-md " inputStyles="px-1 py-3 outline-none rounded-l-md text-gray-800" inputPlaceholder={'Enter Room'} buttonStyles=" rounded-r-md text-md px-2 text-white hover:text-black bg-blue-500  hover:bg-blue-400 " buttonText={'Add Room '}/>
       </div>
      </div>


        {/* message section */}
      <div className=" h-[calc(100vh-5rem)] sm:flex  w-full rounded-e-lg">
        <div className="flex flex-col justify-center items-center h-full w-full">
          <span className=" text-rose-800 font-bold text-2xl">Tips</span>
         <div className="flex flex-col">
         <ul className="list-disc list-inside md:text-lg text-gray-800">
            <li><span>1.</span> Hover over some else's message to join private chat.</li>
            <li ><span>2.</span> Start Conversation by joining a room.</li>
            <li ><span>3.</span> Hover over your message to update it.</li>
          </ul>
         </div>
        </div>
      </div>



    </div>
    
  );
};

export default Chats;
