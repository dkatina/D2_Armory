

import { useEffect, useState} from 'react'
import { getItemDefinition } from '../api/tokenAuth'
import { CancelToken } from 'apisauce'

export default function useGetItemDefinition(token, item) {
    const [response, setResponse] = useState('')

    if (response){
        item = ''
    }

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const defineItem = async () =>{
                const r = await getItemDefinition(token, item.itemHash, source.token)
                setResponse(r)

                return ()=>{source.cancel()}
            }
            if(item?.itemHash){defineItem()}
        },[token, item]
    )

  return response.item
}
