import { useEffect, useState,useContext } from "react";
import { getBuilds } from "../api/buildsAPI";
import { CancelToken } from 'apisauce'
import { useNavigate } from "react-router-dom";


export default function useGetBuild(charId) {
    const [response, setResponse]= useState('')

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const getMyBuilds= async ()=>{
                const r = await getBuilds(charId, source.token)
                console.log(r)
                setResponse(r)
                
                
                return ()=>{source.cancel()}
            }
            if(charId){getMyBuilds()}

        },[charId])
        return response.builds
}