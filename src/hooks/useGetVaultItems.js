import { useEffect, useState,useContext } from "react";
import { getVaultItems } from "../api/tokenAuth";
import { CancelToken } from 'apisauce'
import { AppContext } from '../context/AppContext'


export default function useGetVaultItems(token) {
    const [response, setResponse]= useState('')
    const {dMemId, dMemType} = useContext(AppContext)
    

    if(response){
        token = ''
    }

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const getMyVaultItems = async ()=>{
                const r = await getVaultItems(token,  dMemType, dMemId, source.token)
                setResponse(r)
                
                return ()=>{source.cancel()}
            }
            if (token){getMyVaultItems()}

        },[token, dMemId, dMemType])

    return response.vault
  
}