import { useEffect, useState } from "react";
import { getToken } from "../api/tokenAuth";


export default function useGetToken(code) {
    const [response, setResponse]= useState('')

    useEffect(
        ()=>{
            const getAToken = async ()=>{
                const r = await getToken(code)
                setResponse(r)
            }
            if (code){getAToken()}

        },[code])

    return response    
  
}
