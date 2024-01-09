import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import useRefrehToken from "../hooks/useRefrehToken";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "./Loader";


const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { auth } = useAuth();
    const refresh = useRefrehToken();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
                
            } finally{
                setIsLoading(false);
            }
        }
        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth.accessToken]);
    
    useEffect(() => {
        if(auth.accessToken && window.location.pathname === '/sign-in'){
            navigate('/');
        }
    }, [auth.accessToken, navigate]);
  return (
    <>
    {
        isLoading ? (
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
                <Loader/>
            </div>
        ): (
            <Outlet />
        )
    }
    </>
  )
}

export default PersistLogin