import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import Loader from './Loader'
import { useToast } from '../hooks/useToast'

const DashBoard = () => {
    const {user} = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const {setToast} = useToast()

    const [userCount, setUserCount] = useState(0)
    const [isLoadingUserCount, setIsLoadingUserCount] = useState(false)

    const fetchUsers = async() => {
        setIsLoadingUserCount(true)
        try {
            const response = await axiosPrivate.get('/user?pageSize=1&page=1')
            // console.log(response);
            if(response.statusText === 'OK'){
                // console.log(response.data.meta.totalItems);
                setUserCount(response.data.meta.totalItems)         
            }
        } catch (error) {
            // console.log(error);
            setToast('Something went wrong. Please try again later.', 'error')
            
        } finally{
            setIsLoadingUserCount(false)
        }
        
    }


    useEffect(() => {
        fetchUsers()
    }, [user.role])
  return (
    <div>{
        isLoadingUserCount ? (
            <Loader/>
        ) : (
            userCount
        )
        }</div>
  )
}

export default DashBoard