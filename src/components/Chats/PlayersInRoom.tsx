import { useNavigate } from "react-router-dom";

type PlayersInRoomProps = {
  playerInRoom: {
    id: string;
    player: string;
}[]
}


const PlayersInRoom = ({playerInRoom}: PlayersInRoomProps) => {
  // console.log(playerInRoom);
  
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-black border-gray-500 border w-[90%] m-auto my-4" />
      <h1 className="text-center text-lg font-semibold">Players in room</h1>
      <div >
        <p className=" first-letter:capitalize font-medium my-4 w-[90%] m-auto">
        { playerInRoom.length > 1 ? 'players' : 'player'} in Room: {playerInRoom.length}
        </p>
      </div>
      {
    
        playerInRoom.map((player,id)=>(
          <div className="flex flex-col justify-center  items-center" key={id}>
            <div className= " relative flex justify-between items-center group px-4 bg-blue-500  w-[90%] text-white mt-3 py-3 rounded-md ">
              <p>{player.player}</p>
              {/*add user lai chat button show garna vayae na */}
              <button 
              onClick={()=>{
                console.log(player.id);
                navigate(`/chats/user/${player.id}`)
              
              }}
              className=" absolute right-2 hidden group-hover:block bg-green-400 py-2 px-4 rounded-md transition-all duration-300 ease-in-out">Chat</button>
            </div>
            
          </div>
        ))
      }
     
    </div>
  )
}

export default PlayersInRoom