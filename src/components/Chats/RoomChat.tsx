import { useEffect } from "react";
import useChat from "../../hooks/useChat";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

const RoomChat = ({ roomName }: { roomName: string }) => {
  const { joinRoom, socket, getRoomMessages, messages, setMessages, sendRoomMessage, receiver, players, isLoadingRooms } = useChat();
  const navigate = useNavigate();
  const {user} = useAuth();

  useEffect(() => {
    if (roomName) {
      joinRoom(roomName);
    }
  }, [socket, roomName]);


  useEffect(()=>{

    socket?.on('message_room', ({
      id, message, senderId
    }: {id: string, message:string, senderId: string})=>{
      const newMessage = {
        id, 
        message,
        sender_id:senderId,
        created_at: new Date().toUTCString(),
      }
      const cloneMessages = messages ? [...messages, newMessage] : [newMessage]
      setMessages(cloneMessages)
      // console.log(messages);
      
    })

     // Not the ideal way, but should do for now. :) since server doesn't send these events
    socket?.on('message', ({message, senderId}: {message: string, senderId: string})=>{
      const jsonMessage = JSON.parse(message);

      if(jsonMessage.event === 'join_room'){
        if(jsonMessage.roomName){
          getRoomMessages(roomName)
        }
      }
     
      if(jsonMessage.event === 'leave_room'){
        if(jsonMessage.roomName){
          getRoomMessages(jsonMessage.roomName)

          if(senderId === user.id){
            navigate('/chats')
          }
        }
      }

      if (jsonMessage.event === 'update_message') {
        if (jsonMessage.roomName) {
          getRoomMessages(jsonMessage.roomName)
        }
      }
  
    })


      return () => {
        socket?.off('message_room')
        socket?.off('message')
        socket?.off('join_room')
      }
  },[socket, roomName, messages])

  return(
    <div className="w-full relative h-[90vh] z-0">
      <div className="flex w-full justify-between h-full">


    {/* messages */}
    <div className="flex flex-1 w-full min-h-[calc(100vh-14rem)] relative">
              <div className="flex flex-col px-2 w-full flex-1 h-full justify-end">
    <Messages messages={messages} players={players} userId={user.id} isLoadingRooms={isLoadingRooms} />

    {/* input */}
    <ChatInput receiver={roomName} onSubmit={sendRoomMessage} />
    </div>
    </div>


    </div>
   </div>
  );
};

export default RoomChat;
