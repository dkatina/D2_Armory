import { useEffect} from "react";
import { createBuild } from "../api/buildsAPI";
import { CancelToken } from 'apisauce'
import { useNavigate } from "react-router-dom";


export default function useCreateBuilds(payload, setPayload) {
    
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
                
                
                setPayload('')
                navigate('/builds')
                return ()=>{source.cancel()}
            }
            if (payload){createMyBuild()}

        },[payload, setPayload, navigate])
}