import React, { useEffect, useState } from 'react'
import { Player } from '../../types'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Loader from '../../components/Loader';
import PlayerCard from '../../components/PlayerCard';

const ManagePlayers = () => {

  const axiosPrivate = useAxiosPrivate();
  const {setToast} = useToast();

  const [players, setPlayers] = React.useState<Player[]>([])


  const [searchParam, setSearchParam] = useSearchParams()
  const [page, setPage] = useState(searchParam.get('page'))
  const [loading, setLoading] = useState(false)

  const fetchPlayer = async () => {
    setLoading(true)
    try {
      const res = await axiosPrivate.get(`/user/players/all?pageSize=6&page=${!page?.match(/^\d+$/) ? 1 : page}`)
    console.log(res);

    if(res.status === 200) {
      console.log('done');
      const data: Player[] = res.data.data
      console.log(data);
      
      setPlayers(data)
    
    }
    // console.log(players);
    

    } catch (error) {
     setToast('Something went wrong. Please try again.', 'error')
      
    }finally{
      setLoading(false)
    }
    
  }
  useEffect(() => {
    fetchPlayer()
  }, [searchParam])


  document.title = 'Player Management-Manage Players'
  return (
    <div className='common-container'>
      <div className='user-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>All Players</h2>
        {
          loading && !players ? (
            <Loader />
          ): (
            <ul className='user-grid'>
              {

                players.map((player, index)=>{
                  // console.log(player,"tala");
                  
                  return (
                    <PlayerCard key={index} player={player} setPlayers={setPlayers} players={players} />
                    )
                  })
                }
              </ul>
          )
        }
      </div>
    </div>
  )
}

export default ManagePlayers