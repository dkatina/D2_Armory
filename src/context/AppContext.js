import {createContext, useState} from 'react'
export const AppContext = createContext();

const AppContextPovider = ({children})=>{

    //Checks to see if there is a user from local storage, if there is, it parses the info and returns it
    
    const getTokenFromLS=()=>{
        let token =localStorage.getItem('d2a_token')
        if (token){
            return JSON.parse(token)
        }
    }

    const getBMemIdFromLS=()=>{
        let bMemId =localStorage.getItem('bMemId')
        if (bMemId){
            return JSON.parse(bMemId)
        }
    }

    const getDMemTypeFromLS=()=>{
        let dMemType =localStorage.getItem('dMemType')
        if (dMemType){
            return JSON.parse(dMemType)
        }
    }

    const getDMemIdFromLS=()=>{
        let dMemId =localStorage.getItem('dMemId')
        if (dMemId){
            return JSON.parse(dMemId)
        }
    }

    const getCharacterIdFromLS=()=>{
        let characterId =localStorage.getItem('characterId')
        if (characterId){
            return JSON.parse(characterId)
        }
    }

    const getVaultRefreshFromLS=()=>{
        let vaultRefresh = localStorage.getItem('vaultRefresh')
        if (vaultRefresh){
            return JSON.parse(vaultRefresh)
        }
    }

    const getInventoryRefreshFromLS=()=>{
        let inventoryRefresh = localStorage.getItem('inventoryRefresh')
        if (inventoryRefresh){
            return JSON.parse(inventoryRefresh)
        }
    }

    const getStoredInventoryFromLS=()=>{
        let storedInventory = localStorage.getItem('storedInventory')
        if (storedInventory){
            return JSON.parse(storedInventory)
        }
    }

    const getStoredVaultFromLS=()=>{
        let storedVault = localStorage.getItem('storedVault')
        if (storedVault){
            return JSON.parse(storedVault)
        }
    }

    


    //if there is a user in ls the parsed info get stored in user else user = ''
    const [token, _setToken] = useState(getTokenFromLS()??'')
    const [bMemId, _setBMemId ] = useState(getBMemIdFromLS()??'')
    const [dMemType, _setDMemType] = useState(getDMemTypeFromLS()??'')
    const [dMemId, _setDMemId ] = useState(getDMemIdFromLS()??'')
    const [characterId, _setCharacterId ] = useState(getCharacterIdFromLS()??'')
    const [inventoryRefresh, _setInventoryRefresh] = useState(getInventoryRefreshFromLS()??true)
    const [vaultRefresh, _setVaultRefresh] = useState(getVaultRefreshFromLS()??true)
    const [storedInventory, _setStoredInventory] = useState(getStoredInventoryFromLS()??'')
    const [storedVault, _setStoredVault] = useState(getStoredVaultFromLS()??'')
   

    //set user will be a function in the login paramater, the values returned by
    //the login form will be sent through an api get request to get our user's info
    //this info is then stored in the ls and the context

    //also used in logout, an empty value is sent through which clears the ls and context
    const setToken=(token)=>{
        localStorage.setItem('d2a_token', JSON.stringify(token))
        _setToken(token)
    }

    const setBMemId=(bMemId)=>{
        localStorage.setItem('bMemId', JSON.stringify(bMemId))
        _setBMemId(bMemId)
    }

    const setDMemType=(dMemType)=>{
        localStorage.setItem('dMemType', JSON.stringify(dMemType))
        _setDMemType(dMemType)
    }

    const setDMemId=(dMemId)=>{
        localStorage.setItem('dMemId', JSON.stringify(dMemId))
        _setDMemId(dMemId)
    }

    const setCharacterId=(characterId)=>{
        localStorage.setItem('characterId', JSON.stringify(characterId))
        _setCharacterId(characterId)
    }

    const setInventoryRefresh=(inventoryRefresh)=>{
        localStorage.setItem('inventoryRefresh', JSON.stringify(inventoryRefresh))
        _setInventoryRefresh(inventoryRefresh)
    }

    const setVaultRefresh=(vaultRefresh)=>{
        localStorage.setItem('vaultRefresh', JSON.stringify(vaultRefresh))
        _setInventoryRefresh(vaultRefresh)
    }

    const setStoredInventory=(storedInventory)=>{
        localStorage.setItem('storedInventory', JSON.stringify(storedInventory))
        _setStoredInventory(storedInventory)
    }

    const setStoredVault=(storedVault)=>{
        localStorage.setItem('storedVault', JSON.stringify(storedVault))
        _setStoredVault(storedVault)
    }

   


    //These values are the ones that will be available accross our app
    const values={
        token,
        setToken,
        bMemId,
        setBMemId,
        dMemType,
        setDMemType,
        dMemId,
        setDMemId,
        characterId,
        setCharacterId,
        inventoryRefresh,
        setInventoryRefresh,
        vaultRefresh,
        setVaultRefresh,
        storedInventory,
        setStoredInventory,
        storedVault,
        setStoredVault

       


    }

    return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>

    )
}

export default AppContextPovider