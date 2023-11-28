import { useState } from 'react';
import { CountryMap, Player } from '../types';
import Loader from './Loader';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

type PlayerCardProps ={
    player: Player
}

const PlayerCard = (player: PlayerCardProps) => {
    const {user} = useAuth()
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(false)

    console.log(player.player.active);
  return (


   <>
   {
    player?.player ? (
        <div className='border flex  md:flex-col p-4 gap-5 items-center rounded-md shadow-md pl-6' >
        <img src="/assets/icons/profile-placeholder.svg" alt="profile" className='rounded-full w-12 md:w-14 h-12 md:h-14 ' />
        <div className='flex-1'>
            <p className='text-[18px] md:text-center font-semibold first-letter:capitalize'>{player.player.name}</p>
            <p className='text-[12px] md:text-center'>{CountryMap.get(player.player.country)}</p>

        </div>
        <div className='p-4'>
            <button className={`${user.role === 'admin' ? 'cursor-pointer': 'cursor-default'}`}>
            <div className='relative'>
                <div className={`${player.player.active ? 'bg-emerald-200' : 'bg-rose-200'} w-8 h-4 rounded-full shadow-inner`} />
                <div className={`${player.player.active ? 'bg-emerald-400 right-0' : 'bg-rose-400 left-0'}  absolute  w-4 h-4 bg-white rounded-full shadow top-0 transition` }  />
            </div>
            </button>
        </div>
        </div>
        
    ) : (
        <div className="flex justify-center  items-center min-h-[calc(100vh-8rem)]">
        <Loader />
      </div>
    )
   }
   </>
    )
}

export default PlayerCard