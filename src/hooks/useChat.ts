import { useState } from "react";
import { Message, Room } from "../types";
import useAxiosPrivate from "./useAxiosPrivate";
import useSocket from "./useSocket";

export default function useChat() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activePlayers, setActivePlayers] = useState<Map<string, string>>(
    new Map()
  );
  const [players, setPlayers] = useState<Map<string, string>>(new Map());

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

  const leaveRoom = (roomName: string) => {
    if (roomName !== "") {
      socket?.emit("leave_room", { roomName }, () => {
        socket.emit("message_all", {
          message: JSON.stringify({
            event: "leave_room",
            roomName,
          }),
        });
      });
    }
  };

  const getRooms = async () => {
    setIsLoadingRooms(true);
    try {
      const res = await axios.get("/chats/allRoom");
      // console.log("res", res.data);

      if (res.status === 200) {
        const rooms: Room[] = await res.data;
        setRooms(rooms);
        // console.log("rooms", rooms);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setIsLoadingRooms(false);
    }
  };

  const getPlayers = async (players: string) => {
    setIsLoadingPlayers(true);
    try {
      const res = await axios.get(`/player/${players}`);
      const kv = new Map();

      if (res.statusText === "OK") {
        const data = await res.data;

        if (Array.isArray(data)) {
          for (const player of data) {
            kv.set(player.id, player.name);
          }
        } else {
          kv.set(data.id, data.name);
        }
      }
      return kv;
    } catch (error) {
      console.log("Error fetching players:", error);
    } finally {
      setIsLoadingPlayers(false);
    }
  };

  const getRoomMessages = async (roomName: string) => {
    setIsLoadingMessages(true);

    if (roomName !== receiver) {
      setMessages([]);
      setReceiver(roomName);
    }

    try {
      const res = await axios.get(`/chats/room?roomName=${roomName}`);

      if (
        res.headers &&
        res.status === 200 &&
        res.headers["content-type"]?.includes("application/json")
      ) {
        const json = await res.data;
        const messages: Message[] = json.chats;
        messages.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const active = new Map();

        // collect players who are joined in the room
        for (const player of json.players) {
          active.set(player.id, player.name);
        }
        setActivePlayers(active);

        // collect players who have sent messages in the room at least once
        const players = new Set(messages.map((message) => message.sender_id));

        const kv = await getPlayers(Array.from(players).join(","));
        if (kv) {
          setPlayers((prev) => new Map([...prev, ...kv, ...active]));
        }

        setMessages(messages);
      }
    } catch (error) {
      console.log("Error fetching messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const sendRoomMessage = (roomName: string, message: string) => {
    if (message.trim() === "") return;

    socket?.emit("message_room", {
      roomName,
      message: message.trim(),
    });
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await axios.delete(`/chats/${messageId}`);
      // console.log("res", res);

      socket?.emit("message_all", {
        message: JSON.stringify({
          event: "delete_message",
          id: messageId,
        }),
      });
    } catch (error) {
      console.log("Error deleting message:", error);
    }
  };

  const updatedMessage = async (
    messageId: string,
    newMessage: string,
    roomName?: string
  ) => {
    if (newMessage.trim() === "") return;
    await axios.put(
      `/chats/${messageId}`,
      {
        message: newMessage.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("res", res);

    const newUpdatedMessage = messages.map((message) => {
      if (message.id === messageId) {
        return {
          ...message,
          messages: newMessage.trim(),
        };
      }
      return message;
    });
    setMessages(newUpdatedMessage);

    socket?.emit("message_all", {
      message: JSON.stringify({
        event: "update_message",
        roomName,
      }),
    });
  };

  const getPrivateMessages = async (senderId: string, recipientId: string) => {
    setIsLoadingMessages(true);
    if (recipientId !== receiver) {
      setMessages([]);
      setReceiver(recipientId);
    }

    try {
      const res = await axios.get(
        `/chats/personal?senderId=${senderId}&receiverId=${recipientId}`
      );
      if (res.status === 200) {
        const message: Message[] = await res.data;

        message.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        setMessages(message);
      }
    } catch (error) {
      console.log("Error fetching private messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const sendPrivateMessage = (recipientId: string, message: string) => {
    if (message.trim() === "") return;

    socket?.emit("privateMessage", {
      message: message.trim(),
      recipientId,
    });
  };

  return {
    joinRoom,
    getRooms,
    leaveRoom,

    receiver,

    messages,
    setMessages,

    getPlayers,
    getRoomMessages,
    sendRoomMessage,
    deleteMessage,
    updatedMessage,

    getPrivateMessages,
    sendPrivateMessage,

    rooms,

    players,
    setPlayers,
    activePlayers,
    socket,

    isLoadingRooms,
    isLoadingMessages,
    isLoadingPlayers,
  };
}
