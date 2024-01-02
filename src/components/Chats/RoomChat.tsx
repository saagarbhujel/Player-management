import React, { useEffect } from "react";
import useChat from "../../hooks/useChat";

const RoomChat = ({ roomName }: { roomName: string }) => {
  const { joinRoom, socket } = useChat();

  useEffect(() => {
    if (roomName) {
      joinRoom(roomName);
    }
  }, [socket, roomName]);
  return <div>RoomChat</div>;
};

export default RoomChat;
