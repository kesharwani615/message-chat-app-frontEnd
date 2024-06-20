/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";



const useGetConversation = () => {
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations]=useState([]);
    const { url }= useConversation();

    useEffect(()=>{
      const getAllUser= async ()=>{
      const {token}=JSON.parse(localStorage.getItem('chat-user'));
      console.log("token:::::", token);
      try {
        const res = await fetch(`${url}/api/user/`,{
          method:'GET',
          headers: {
            'Authorization':token,
        }
        });

        console.log("Res:",res)

        const data = await res.json();
        console.log("data:",data);

        if(data.error){
          throw new Error(data.error); 
        }
        setConversations(data);

      } catch (error) {
        toast.error(error);
      }
    }
      getAllUser();
    },[]);
  

  return {loading,conversations};
}

export default useGetConversation;
