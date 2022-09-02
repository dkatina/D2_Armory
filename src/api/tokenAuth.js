import { tokenAuth } from "./destinyAPIClient.js";
import fetch from "node-fetch"



export const getUser = async (token, cancelToken) =>{
    let error;
    let bMemId;

    const response = await tokenAuth(token, cancelToken).get('/Platform/User/GetCurrentBungieNetUser/')
    if (response.ok){
        bMemId = response.data.Response.membershipId
    }else if (response.status === 401){
        error = "Invalid username or password"
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        bMemId
    }
    
}

export const getDestinyId = async (token, membershipId, cancelToken) =>{
    let error;
    let dMemType;
    let dMemId
    let username

    const response = await tokenAuth(token, cancelToken).get(`/Platform/Destiny2/254/Profile/${membershipId}/LinkedProfiles/`)
    if (response.ok){
        dMemType = response.data.Response.profiles[0].membershipType
        dMemId = response.data.Response.profiles[0].membershipId
        username = response.data.Response.profiles[0].displayName
    }else if (response.status === 401){
        error = "Invalid username or password"
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        dMemType,
        dMemId,
        username
    }
    
}

export const getCharacters = async (token, dMemType, dMemId, cancelToken) =>{
    let error
    let characters;

    const response = await tokenAuth(token, cancelToken).get(`/Platform/Destiny2/${dMemType}/Profile/${dMemId}/?components=200`)
    if (response.ok){
        characters = response.data.Response.characters.data
    }else if (response.status === 401){
        error = "Invalid username or password"
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        characters
    }
    
}

export const getCharacterItems = async (token, characterId, dMemType, dMemId, cancelToken) =>{
    let error;
    let equipped;
    let inventory;

    const response = await tokenAuth(token, cancelToken).get(`/Platform/Destiny2/${dMemType}/Profile/${dMemId}/Character/${characterId}/?components=201,205`)
    if (response.ok){
        equipped = response.data.Response.equipment.data.items
        inventory = response.data.Response.inventory.data.items
    }else if (response.status === 401){
        error = "Invalid username or password"
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        equipped, //Returns list of items what's important is the item hash and id
        inventory
    }
    
}

export const getVaultItems = async (token, dMemType, dMemId, cancelToken)=>{
    let error;
    let vault;

    const response = await tokenAuth(token, cancelToken).get(`/Platform/Destiny2/${dMemType}/Profile/${dMemId}/?components=102`)
    if (response.ok){
        vault = response.data.Response.profileInventory.data.items
    }else if (response.status === 401){
        error = "Invalid username or password"
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        vault
    }
}

export const getItemDefinition = async (token, itemHash, cancelToken)=>{
    let error;
    let item;

    const response = await tokenAuth(token, cancelToken).get(`/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`)
    if (response.ok){
        item = response.data.Response
    }else if (response.status === 401){
        error = "Invalid username or password"
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        item
    }
}

export const getItemStats = async (token, dMemType, dMemId, itemInstanceId, cancelToken) =>{
    let error;
    let item;

    const response = await tokenAuth(token, cancelToken).get(`/Platform/Destiny2/${dMemType}/Profile/${dMemId}/Item/${itemInstanceId}/?components=304`)
    if (response.ok){
        item = response.data.Response
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        item
    }
}

export const getItemInstance = async (token, dMemType, dMemId, itemInstanceId, cancelToken) =>{
    let error;
    let item;

    const response = await tokenAuth(token, cancelToken).get(`/Platform/Destiny2/${dMemType}/Profile/${dMemId}/Item/${itemInstanceId}/?components=300`)
    if (response.ok){
        item = response.data.Response.instance.data.cannotEquipReason
    }else{
        error = "An unexpected Error"
    }

    return {
        error,
        item
    }
}





export const getToken = async (code) =>{
    const result = await fetch('https://www.bungie.net/Platform/App/OAuth/Token/',{
    method: 'POST',
    headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic NDExNTA6bHI1T0U2cGtiMVlacGgyM0NxYlFSblhINktxU3JXdnFQeDZ5WEY0N0hPWQ=="
    },
    body: new URLSearchParams({
        "grant_type": "authorization_code",
        "code": code
    })
    })

    const data = await result.json()
    console.log(data)
    return data.access_token
}


// const potentialPayload ={
//     characterId: characterId,
//     itemId: itemInstanceId,
//     itemReferenceHash: parseInt(itemHash),
//     membershipType: dMemType,
//     statckSize: 1,
//     transferToVault: sendToVault
// }

export const transferItem = async (token, payload, cancelToken) =>{
    
    const response = await tokenAuth(token, cancelToken).post('/Platform/Destiny2/Actions/Items/TransferItem/', payload)

    return response
}

export const equipItems = async (token, payload, cancelToken) =>{
    
    const response = await tokenAuth(token, cancelToken).post('/Platform/Destiny2/Actions/Items/EquipItems/', payload)

    return response
}