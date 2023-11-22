import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { Player } from "../types";
import useAuth from "./useAuth";

const useDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const {user} = useAuth();
  

  const [details, setDetails] = useState<Player | null>(null);
 

  useEffect(() => {
    if(user.role !== 'player') return;
    const fetchDetails = async () => {
      try {
        const response = await axiosPrivate.get("/player");
        // console.log(response);
        
        if (response.statusText === 'OK') {
          setDetails(response.data);
        } else {
          setDetails(null);
        }
      } catch (error) {
        console.log(error);
        setDetails(null);
      }
    };

    fetchDetails();
  }, [user.role]);
  // console.log(details);

  return { details };
};

export default useDetails;
