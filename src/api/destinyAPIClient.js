import {create} from 'apisauce'

const base = 'https://www.bungie.net'
const apiKey = "4d882c4d57da4b42aaa67ceddaab3064"

const databaseurl = 'http://127.0.0.1:5000'

export const tokenAuth = (token, cancelToken) => create({
    baseURL: base,
    cancelToken,
    headers:{
        "x-api-key": apiKey,
        Authorization: 'Bearer ' + token 
    }
})

export const dbNoAuth = (cancelToken) => create ({
    baseURL: databaseurl,
    cancelToken,
})







