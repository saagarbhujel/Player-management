import { useEffect, useRef, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { CountryMap, Player } from "../types"
import { useNavigate } from "react-router-dom"


const LeaderBoard =  () => {
    const axiosPrivate = useAxiosPrivate()

    const [leaderBoardData, setLeaderBoardData] = useState<Player[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isFetching = useRef(false)
    const navigate = useNavigate()

    const fetchLeaderBoard = async () => {
        if(isFetching.current) return
        isFetching.current = true
        setIsLoading(true)

        try {
            const res =await axiosPrivate.get("/player/leaderboard")
            // console.log(res.data);
            const data: Player[] = res.data
            // console.log(data);
            setLeaderBoardData(data)
            
        } catch (error) {
            console.log(error);
            
            
        } finally{
            isFetching.current = false
            setIsLoading(false)
        }
        
    }

    useEffect(()=>{
      fetchLeaderBoard()

      const pollInterval = setInterval(() =>{
        fetchLeaderBoard()
      }, 10000)

      return()=>{
        clearInterval(pollInterval)
      }
    },[])

    
    if(isLoading && !leaderBoardData){
      return(
        <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
        <h3>Loading...</h3>
      </div>
      )
    }
  return (
    <>
    <section className="  mr-4  ml-4  ">
      <h1  className="text-center uppercase mb-8 font-medium text-[24px] md:text-[30px] ">
        Leaderboard - Top 5 Players
      </h1>
        <div className="flex justify-center">
            <table>
            <thead>
                  <tr>
                    <th className="bg-blue-100 border  border-gray-100 px-3  md:px-10 md:py-4 font-extralight text-sm md:text-base md:font-normal">
                      Rank
                    </th>
                    <th className="bg-blue-100 border  border-gray-100 px-3  md:px-10 md:py-4 font-extralight md:text-base text-sm md:font-normal">
                      Name
                    </th>
                    <th className=" bg-blue-100 border  border-gray-100 px-3  md:px-10 md:py-4 font-extralight text-sm md:text-base md:font-normal">
                      Active
                    </th>
                    <th className="bg-blue-100 border  border-gray-100 px-3  md:px-10 md:py-4 font-extralight text-sm md:text-base md:font-normal">
                      Country
                    </th>
                    <th className="bg-blue-100 border  border-gray-100 px-2  md:px-10 md:py-4 font-extralight text-sm md:text-base md:font-normal">
                      Games Won
                    </th>
                    <th className="bg-blue-100 border  border-gray-100 px-2  md:px-10 md:py-4 font-extralight text-sm md:text-base md:font-normal">
                      Games Played
                    </th>
                    <th className="bg-blue-100 border  border-gray-100 px-10 py-4 font-normal hidden md:block ">
                      Points
                    </th>
                    {/* <th className="bg-blue-100 border text-left border-gray-100 px-10 py-4 font-normal hidden md:block">
                      Coins
                    </th> */}
                  </tr>
            </thead>

            <tbody>
                {
                    leaderBoardData?.map((player) => {
                        return (
                            <tr key={player.id} className="hover:bg-primary-500/20 ">
                                <td className="border px-4  text-center py-2 md:py-4 text-sm md:text-base md:font-normal">
                                    {player.rank}
                                </td>

                                <td className="border px-4 md:px-8 text-center py-2  md:py-4 text-sm md:text-base md:font-normal">
                                  <button
                                  onClick={() => navigate(`/profile/${player.id}`)}
                                  className="first-letter:capitalize text-blue-500  ">
                                    {player.name}
                                  </button>
                                </td>

                                <td className="border px-3 md:px-8 py-2 text-center  md:py-4 text-sm md:text-base md:font-normal">
                                {player.active ? (
                              <span className="text-green-500">Active</span>
                            ) : (
                              <span className="text-red-500">Inactive</span>
                            )}
                                </td >


                                <td className="border px-4 md:px-8 py-2 text-center  md:py-4 text-sm md:text-base md:font-normal">
                                    {CountryMap.get(player.country)}
                                </td>

                                <td className="border px-2 md:px-8 py-2 text-center  md:py-4 text-sm md:text-base md:font-normal">
                                    {player.statistics.games_won}
                                </td>

                                <td className="border px-2 md:px-8  py-2  md:py-4 text-center text-sm md:text-base md:font-normal">
                                    {player.statistics.games_played}
                                </td>
                                <td className=" border px-8 py-2  md:py-4 text-center hidden md:block text-sm md:text-base md:font-normal">
                                    {player.statistics.experience_point}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    </section>

  
    </>
  )
}

export default LeaderBoard