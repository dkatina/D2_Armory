import { useEffect} from "react";
import { transferItem } from "../api/tokenAuth";
import { CancelToken } from 'apisauce'
import { useNavigate } from "react-router-dom";


export default function useTransferItems(token, payload, setPayload) {
    const navigate = useNavigate()

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const transferThisItem = async ()=>{
                console.log('payload recieved')
                const r = await transferItem(token,  payload, source.token)
                console.log('item transfer')
                console.log(r)
                
                setPayload('')
                navigate(payload.transferToVault ? '/vault':'/inventory')
                return ()=>{source.cancel()}
            }
            if (payload){transferThisItem()}

        },[token, payload, setPayload, navigate])
}