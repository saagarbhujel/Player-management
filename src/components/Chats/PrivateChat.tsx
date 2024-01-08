import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

const PrivateChat = ({ userId }: { userId: string }) => {
  const { user } = useAuth();

  const [editMessage, setEditMessage] = useState("");
  const [editedMessage, setEditedMessage] = useState("");

  const {
    getPrivateMessages,
    messages,
    setMessages,
    players,
    setPlayers,
    getPlayers,
    socket,
    isLoadingMessages,
    deleteMessage,
    sendPrivateMessage,
    updatedMessage,
    isLoadingPlayers,
  } = useChat();

  const assignPlayers = async () => {
    try {
      const playerMap = await getPlayers(`${user.id},${userId}`);

      // Check if the playerMap is a valid Map object before setting the state
      if (playerMap instanceof Map) {
        setPlayers((prevPlayers) => new Map([...prevPlayers, ...playerMap]));
      } else {
        console.warn("Invalid playerMap:", playerMap);
      }
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    getPrivateMessages(user.id, userId);
    assignPlayers();
  }, [socket, userId]);

  useEffect(() => {
    socket?.on(
      "privateMessage",
      ({
        id,
        message,
        senderId,
      }: {
        id: string;
        message: string;
        senderId: string;
      }) => {
        const newMessage = {
          id,
          message,
          sender_id: senderId,
          created_at: new Date().toUTCString(),
        };
        const clone = messages ? [...messages, newMessage] : [newMessage];
        setMessages(clone);
      }
    );

    // not the ideal way to do this but it works for now
    socket?.on(
      "message",
      ({ message, senderId }: { message: string; senderId: string }) => {
        const jsonMessage = JSON.parse(message);

        if (jsonMessage.event === "delete_message") {
          setMessages(
            messages.filter((message) => message.id !== jsonMessage.id)
          );
        }

        if (jsonMessage.event === "update_message") {
          if (senderId === user.id || senderId === userId) {
            getPrivateMessages(user.id, userId);
          }
        }
      }
    );

    return () => {
      socket?.off("privateMessage");
      socket?.off("message");
    };
  }, [socket, messages, user.id]);

  const handleUpdateMessage = (messageId: string) => {
    updatedMessage(messageId, editedMessage);
    setEditMessage("");
  };

  document.title = players.get(userId) || "Loading Chat";

  if (!isLoadingPlayers && !players.has(userId)) {
    return (
      <div className="flex justify-center w-full items-center text-2xl">
        <span>Player Not Found</span>
      </div>
    );
  }

  return (
    <div className="w-full relative h-[90vh] z-0">
      <div className="flex w-full justify-between h-full">
        {userId ? (
          <div className="flex flex-1 w-full min-h-[calc(100vh-14rem)] relative">
            <div
              className=" absolute bg-primary-500 text-white  z-50 text-center 
              rounded-br-full w-[6rem] md:w-48 pb-1 md:pb-2 shadow-md md:flex justify-center"
            >
              <span className="hidden md:block">Recipient:</span>{" "}
              {players.get(userId)}
            </div>
            <div className="flex flex-col px-2 w-full flex-1 h-full justify-end">
              <Messages
                messages={messages}
                players={players}
                userId={user.id}
                isLoadingMessages={isLoadingMessages}
                deleteMessage={deleteMessage}
                editMessage={editMessage}
                setEditMessage={setEditMessage}
                editedMessage={editedMessage}
                setEditedMessage={setEditedMessage}
                handleUpdateMessage={handleUpdateMessage}
                isPrivate={true}
              />

              {/* input */}
              <ChatInput receiver={userId} onSubmit={sendPrivateMessage} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PrivateChat;
