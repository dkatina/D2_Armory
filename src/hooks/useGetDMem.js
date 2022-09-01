import { useEffect, useState } from "react";
import { getUser, getDestinyId } from "../api/tokenAuth";
import { CancelToken } from 'apisauce'


export default function useGetDMem(token) {
    const [response, setResponse]= useState('')

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const getDMem = async ()=>{
                const { bMemId } = await getUser(token, source.token)
                const r = await getDestinyId(token, bMemId, source.token)
                setResponse(r)

                return ()=>{source.cancel()}
            }
            if (token){getDMem()}

        },[token])

    return response    
  
}
