import { useEffect, useState,useContext } from "react";
import { getCharacterItems } from "../api/tokenAuth";
import { CancelToken } from 'apisauce'
import { AppContext } from '../context/AppContext'


export default function useGetCharacterItems(token, characterId) {
    const [response, setResponse]= useState('')
    const {dMemId, dMemType} = useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const getMyCharacterItems = async ()=>{
                const r = await getCharacterItems(token, characterId, dMemType, dMemId, source.token)
                console.log("My Character's items")
                console.log(r)
                setResponse(r)
                return ()=>{source.cancel()}
            }
            if (token && characterId){getMyCharacterItems()}

        },[token, characterId])

    return response
  
}