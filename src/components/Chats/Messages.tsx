import { useEffect, useRef, useState } from "react";
import { Message } from "../../types";
import { getDate, getFullDate } from "../../utils";
import Loader from "../Loader";
// import { useNavigate } from "react-router-dom";

type MessagesProps = {
  messages: Message[];
  players: Map<string, string>;
  userId: string;
  isLoadingRooms: boolean;
};

const Messages = ({
  messages,
  players,
  userId,
  isLoadingRooms,
}: MessagesProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  const [isDropDownOpen, setIsDropDownOpen] = useState<string | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleToggleDropDown = (id: string) => {
    setIsDropDownOpen((prev) => (prev === id ? null : id));
  };

  if (isLoadingRooms) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div ref={chatRef} className="max-h-[85vh] overflow-y-auto ">
      {messages.length
        ? messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center mx-4    ${
                message.sender_id === userId ? "justify-end" : "justify-start "
              }`}
            >
              <div className="flex items-end my-3 group ">
                {/* profile-badge */}
                {message.sender_id !== userId ? (
                  <div className="w-10 h-10 rounded-full ">
                    <img
                      src="/assets/icons/profile-placeholder.svg"
                      alt="image"
                    />
                  </div>
                ) : null}

                {/* message bubble */}
                <div className=" flex flex-col ">
                  <div
                    className={
                      " flex relative  justify-between items-center w-[96%]  "
                    }
                  >
                    <span
                      className={`${
                        message.sender_id !== userId
                          ? "text-gray-500 mx-5 py-1 text-sm "
                          : "hidden "
                      }`}
                    >
                      {players.get(message.sender_id)}
                    </span>

                    <span
                      className={`${
                        message.sender_id !== userId
                          ? "text-gray-500 md:mx-5 md:py-1 text-xs md:text-sm hidden md:block"
                          : "text-gray-500 text-xs md:text-sm md:mx-5 md:py-1   md:text-end  hidden md:block  w-full "
                      }`}
                    >
                      {getDate(new Date(message.created_at))}
                    </span>
                  </div>

                  <div className="flex items-center relative ">
                    <div
                      className={`  py-2 rounded-lg mx-4  px-4 group relative max-w-xs md:w-[18vw] md:max-w-md text-lg font-inter  ${
                        message.sender_id === userId
                          ? "bg-blue-500/95 text-white rounded-br-none "
                          : "bg-gray-500/30  rounded-bl-none "
                      }`}
                    >
                      {message.message.split("\n").map((msg, index) => (
                        <p key={index}>{msg || "\u00A0"}</p>
                      ))}
                    </div>

                    {/* three dots */}
                    {
                      <div
                        className={` absolute group-hover:block ${
                          isDropDownOpen === message.id ? "block" : "md:hidden"
                        }   ${
                          message.sender_id === userId
                            ? " left-[-12px] "
                            : "right-[-4px] md:right-[-12px]"
                        }`}
                      >
                        <button
                          onClick={() => handleToggleDropDown(message.id)}
                        >
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 4 15"
                          >
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                          </svg>
                        </button>

                        {/* dropdown */}
                        {isDropDownOpen === message.id && (
                          <div
                            id="dropdownDots"
                            className={`z-10 bg-gray-100 drop-shadow-md absolute divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600 ${
                              message.sender_id === userId
                                ? " left-[-9rem] "
                                : " right-[-9rem]"
                            } `}
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownMenuIconButton"
                            >
                              
                              
                            
                              {message.sender_id === userId ? (
                                <>
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Delete
                                    </a>
                                  </li>
                                </>
                              ) : (
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Private Chat
                                  </a>
                                </li>
                              )}
                               <li className="text-center text-gray-400 pt-4">
                                {
                                   getFullDate(new Date(message.created_at)) 
                                }
                               </li>

                              {/* Add other list items here */}
                            </ul>
                          </div>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Messages;
