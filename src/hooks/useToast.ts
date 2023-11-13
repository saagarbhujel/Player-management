import { useContext } from "react";
import ToastContext from "../context/ToastContest";


export function useToast(){
    const value = useContext(ToastContext)
    return value
}