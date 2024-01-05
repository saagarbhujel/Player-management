import { useEffect, useRef } from "react";
import { Message } from "../../types";
import { getDate } from "../../utils";
// import { useNavigate } from "react-router-dom";

type MessagesProps = {
  messages: Message[];
  players: Map<string, string>;
  userId: string;
};

const Messages = ({ messages, players, userId }: MessagesProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={chatRef} className="max-h-[85vh] overflow-y-auto">
      {messages.length
        ? messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center mx-4 ${
                message.sender_id === userId ? "justify-end" : "justify-start "
              }`}
            >
              <div className="flex items-end my-3  ">
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
                <div className=" flex flex-col  ">
                  <div
                    className={" flex justify-between items-center w-[98%] "}
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
                          ? "text-gray-500 mx-5 py-1 text-sm "
                          : "text-gray-500 mx-5 py-1 text-sm text-end ml-[15rem]  "
                      }`}
                    >
                      {getDate(new Date(message.created_at))}
                    </span>
                  </div>
                 

                  <div
                    className={`  py-2 rounded-lg mx-4  px-4 group relative max-w-xs md:w-[18vw] md:max-w-md text-lg font-inter ${
                      message.sender_id === userId
                        ? "bg-blue-500 text-white rounded-br-none "
                        : "bg-gray-700/30  rounded-bl-none "
                    }`}
                  >
                    {message.message.split("\n").map((msg, index) => (
                      <p key={index}>{msg || "\u00A0"}</p>
                    ))}
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
