import { useEffect, useState,useContext } from "react";
import { createBuild } from "../api/buildsAPI";
import { CancelToken } from 'apisauce'
import { useNavigate } from "react-router-dom";


export default function useCreateBuilds(payload, setPayload) {
    const [response, setResponse]= useState('')
    const navigate = useNavigate()

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const createMyBuild= async ()=>{
                console.log('payload recieved')
                console.log(payload)
                const r = await createBuild(payload, source.token)
                console.log('item transfer')
                console.log(r)
                setResponse(r)
                
                setPayload('')
                navigate('/builds')
                return ()=>{source.cancel()}
            }
            if (payload){createMyBuild()}

        },[payload, setPayload])
}