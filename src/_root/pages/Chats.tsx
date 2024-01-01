import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

const Chats = () => {
  const [showRightNav, setShowRightNav] = useState(false);

  document.title = "Player Management-Chats";
  return (
    <div className="w-full  min-h-full  h-[calc(100vh-5rem)] relative z-20  ">
      <nav className="flex justify-between items-center  w-full h-16  bg-primary-500 px-5  ">
        <h1 className="text-2xl font-semibold">Chats</h1>
        Join room
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
        } top-16 right-0 w-[18vw] bg-gray-200 h-full rounded-br-lg  fixed ease-in-out duration-300`}>
        Right aside
      </div>


        {/* message section */}
      <div className=" h-[calc(100vh-5rem)] sm:flex  w-full rounded-e-lg ">
        <div className="flex flex-col justify-center items-center w-full">
          <span className=" text-rose-800 font-bold text-2xl">Tips</span>
         <div className="flex flex-col">
         <ul className="list-disc list-inside text-lg text-gray-800">
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
