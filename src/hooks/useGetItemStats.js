import { useEffect, useState} from 'react'
import { getItemStats } from '../api/tokenAuth'
import { CancelToken } from 'apisauce'

export default function useGetItemStats(token, dMemType, dMemId, itemInstanceId) {
    const [response, setResponse] = useState('')

    if (response){
        itemInstanceId = ''
    }

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const getStats = async () =>{
                const r = await getItemStats(token,dMemType, dMemId, itemInstanceId.itemInstanceId, source.token)
                setResponse(r)

                
                return ()=>{source.cancel()}
            }
            if(token && itemInstanceId?.itemInstanceId){getStats()}
        },[token, itemInstanceId, dMemId, dMemType]
    )

  return response?.item?.stats.data.stats
}
