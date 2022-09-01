import { useEffect, useState } from "react";
import { getCharacters } from "../api/tokenAuth";
import { CancelToken } from 'apisauce'


export default function useGetCharacters(token, dMemType, dMemId) {
    const [response, setResponse]= useState('')

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const getMyCharacters = async ()=>{
                const r = await getCharacters(token, dMemType, dMemId, source.token)
                console.log('My Characters')
                console.log(r)
                setResponse(r)

                return ()=>{source.cancel()}
            }
            if (token){getMyCharacters()}

        },[token, dMemType, dMemId])

    return response.characters    
  
}