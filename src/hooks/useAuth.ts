import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const useAuth = () => {
    const value = useContext(AuthContext)
    return value
}

export default useAuth;