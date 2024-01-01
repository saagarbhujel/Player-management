import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { Socket, io } from "socket.io-client";

const useSocket = () => {
  const { auth } = useAuth();

  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io("ws://localhost:8080", {
      extraHeaders: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    });

    socket.on("error", () => {
      console.log("error in socket");
    });

    socket.on("connect", () => {
      console.log("connected to socket");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from socket");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [auth]);

  return socket;
};

export default useSocket;
