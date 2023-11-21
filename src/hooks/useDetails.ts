import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { Player } from "../types";

const useDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  

  const [details, setDetails] = useState<Player | null>(null);
 

  useEffect(() => {
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
  }, []);
  // console.log(details);

  return { details };
};

export default useDetails;
