import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import useRefrehToken from "../hooks/useRefrehToken";
import { Outlet, useNavigate } from "react-router-dom";


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
            <div>
                Loading...
            </div>
        ): (
            <Outlet />
        )
    }
    </>
  )
}

export default PersistLogin