import React from 'react'
import { useContext, useState } from 'react'
import useGetVaultItems from '../hooks/useGetVaultItems'
import { AppContext } from '../context/AppContext'
import { getItemDefinition } from '../api/tokenAuth'
import { CancelToken } from 'apisauce'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material';




export default function VaultItems() {
    const {token} = useContext(AppContext)
    const [vaultItemDefs, setVaultItemDefs] = useState('')

    const navigate = useNavigate()

    const vault = useGetVaultItems(token)
    

    let equippable

   
    equippable = vault?.filter(item => item.bucketHash === 138197802)
    

    const source = CancelToken.source()
    const defineItem = async (item) =>{
        const r = await getItemDefinition(token, item.itemHash, source.token)
        
        return r.item
    }

    const getVaultDefs = async(items)=>{
        let itemDefs = []
        for (let item of items){
            const itemDef = await defineItem(item)
            const itemInstanceId = item.itemInstanceId
            const itemHash = item.itemHash
            itemDef.itemHash = itemHash
            itemDef.itemInstanceId = itemInstanceId
            itemDefs.push(itemDef)
        }
        setVaultItemDefs(itemDefs)
        return ()=>{source.cancel()}
    }

    if(!vaultItemDefs && equippable){getVaultDefs(equippable)}

    let vaultArmor = []
    if(vaultItemDefs?.length > 0){
        const vaultGuantlets = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Gauntlets')
        const vaultLegs = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Leg Armor')
        const vaultChest = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Chest Armor')
        const vaultHelmet = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Helmet')
        vaultArmor = vaultArmor.concat(vaultGuantlets, vaultLegs, vaultChest, vaultHelmet)
    }
   
    

   

    const handleItemSelect =(itemId, itemHash, location)=>{
        navigate(`/inspect-item/${itemId}-${itemHash}-${location}`)
      }


    if (vaultArmor?.length < 1){
    return (
        <Box sx={{marginLeft: '49%', marginTop: '30%'}}>
            <CircularProgress sx={{mx: 'auto'}}/>
        </Box>
    )
    } 



  return (
    <div>Behold.....My Stuff
        <List style={{display: 'flex',flexDirection: 'row', maxWidth: '1000px', flexWrap:'wrap'}}>
        {vaultArmor?.map((item) => (
            <ListItemButton className="gearButton" key={item.itemInstanceId} onClick={()=>{handleItemSelect(item.itemInstanceId, item.itemHash, 'vault')}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '50px'}}>
                
                </Box>  
            </ListItemButton>
          ))}
      </List>
    </div>
  )
}

