import { useState } from "react";
import { Room } from "../types";
import useAxiosPrivate from "./useAxiosPrivate";
import useSocket from "./useSocket";

export default function useChat() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  const axios = useAxiosPrivate();
  const socket = useSocket();

  const joinRoom = (roomName: string) => {
    if (roomName !== "") {
      socket?.emit("join_room", { roomName }, () => {
        socket.emit("message_all", {
          message: JSON.stringify({
            event: "join_room",
            roomName,
          }),
        });
      });
    }

    if (!rooms.find((room) => room.name === roomName)) {
      socket?.emit("message_all", {
        message: JSON.stringify({
          event: "create_room",
        }),
      });
    }
  };

  const getRooms = async () => {
    setIsLoadingRooms(true);
    try {
      const res = await axios.get("/chats/allRoom");

      if (res.status === 200) {
        const rooms: Room[] = await res.data;
        setRooms(rooms);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setIsLoadingRooms(false);
    }
  };

  return {
    joinRoom,
    getRooms,

    rooms,

    socket,

    isLoadingRooms,
  };
}
