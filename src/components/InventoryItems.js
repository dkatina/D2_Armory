import { Box } from '@mui/material'
import React from 'react'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import useGetCharacterItems from '../hooks/useGetCharacterItems'
import useGetItemDefinition from '../hooks/useGetItemDefinition'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { getItemDefinition } from '../api/tokenAuth'
import { CancelToken } from 'apisauce'
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'


export default function InventoryItems() {
    const {token, characterId} = useContext(AppContext)
    const [helmetDefs, setHelmetDefs] = useState('')
    const [gauntletDefs, setGauntletDefs] = useState('')
    const [chestDefs, setChestDefs] = useState('')
    const [legDefs, setLegDefs] = useState('')
    const navigate = useNavigate()

    const characterItems = useGetCharacterItems(token, characterId)
    
    const equipped = characterItems?.equipped
    const inventory = characterItems?.inventory
   

    let eHelmet = equipped?.filter(item => item.bucketHash === 3448274439)[0]
    let eChest = equipped?.filter(item => item.bucketHash === 14239492)[0]
    let eGauntlets = equipped?.filter(item => item.bucketHash === 3551918588)[0]
    let eLegs = equipped?.filter(item => item.bucketHash === 20886954)[0]
   
   

    let iHelmet = inventory?.filter(item => item.bucketHash === 3448274439)
    let iChest = inventory?.filter(item => item.bucketHash === 14239492)
    let iGauntlet = inventory?.filter(item => item.bucketHash === 3551918588)
    let iLegs = inventory?.filter(item => item.bucketHash === 20886954)
    
    let eHelmetDef = useGetItemDefinition(token, eHelmet)
    let eChestDef = useGetItemDefinition(token, eChest)
    let eGauntletsDef = useGetItemDefinition(token, eGauntlets)
    let eLegsDef = useGetItemDefinition(token, eLegs)
   


    const source = CancelToken.source()
    const defineItem = async (item) =>{
        const r = await getItemDefinition(token, item.itemHash, source.token)
        
        return r.item
    }

    
    
    const getHelmetDef =async (items)=>{
      let iHelmetDef = []
      for (let item of items){
          const itemDef = await defineItem(item)
          const itemInstanceId = item.itemInstanceId
          const itemHash = item.itemHash
          itemDef.itemHash = itemHash
          itemDef.itemInstanceId = itemInstanceId
          iHelmetDef.push(itemDef)
      }
      setHelmetDefs(iHelmetDef)
      return ()=>{source.cancel()}
    }

    const getChestDef = async (items)=>{
      let iChestDef = []
      for (let item of items){
        const itemDef = await defineItem(item)
        const itemInstanceId = item.itemInstanceId
        const itemHash = item.itemHash
        itemDef.itemHash = itemHash
        itemDef.itemInstanceId = itemInstanceId
        iChestDef.push(itemDef)
      }
      setChestDefs(iChestDef)
      return ()=>{source.cancel()}
    }

    const getGauntletDef = async (items)=>{
      let iGauntletDef = []
      for (let item of items){
        const itemDef = await defineItem(item)
        const itemInstanceId = item.itemInstanceId
        const itemHash = item.itemHash
        itemDef.itemHash = itemHash
        itemDef.itemInstanceId = itemInstanceId
        iGauntletDef.push(itemDef)
      }
      setGauntletDefs(iGauntletDef)
      return ()=>{source.cancel()}
    }

    const getLegDef = async (items)=>{
      let iLegDef = []
      for (let item of items){
        const itemDef = await defineItem(item)
        const itemInstanceId = item.itemInstanceId
        const itemHash = item.itemHash
        itemDef.itemHash = itemHash
        itemDef.itemInstanceId = itemInstanceId
        iLegDef.push(itemDef)
      }
      setLegDefs(iLegDef)
      return ()=>{source.cancel()}
    }




    if(iHelmet && !helmetDefs){getHelmetDef(iHelmet)}
    if(iChest && !chestDefs){getChestDef(iChest)}
    if(iGauntlet && !gauntletDefs){getGauntletDef(iGauntlet)}
    if(iLegs && !legDefs  ){getLegDef(iLegs)}
    
    const handleItemSelect =(itemId, itemHash, location)=>{
      navigate(`/inspect-item/${itemId}-${itemHash}-${location}`)
    }




    if (!helmetDefs || !chestDefs || !gauntletDefs || !legDefs){
      return (
          <Box sx={{marginLeft: '49%', marginTop: '30%'}}>
              <CircularProgress sx={{mx: 'auto'}}/>
          </Box>
      )
    } 
    

  return (
    <div style={{width: '100%'}}>
      <h3>Equipped</h3>
      <List sx={{display: 'flex'}}>
            <ListItem  disablePadding >
            <ListItemButton className="gearButton" onClick={()=>{handleItemSelect(eHelmet.itemInstanceId, eHelmet.itemHash, 'equipped')}} sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${eHelmetDef?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
              </Box>  
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton className="gearButton" onClick={()=>{handleItemSelect(eGauntlets.itemInstanceId, eGauntlets.itemHash, 'equipped')}} sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${eGauntletsDef?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                
              </Box>  
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton className="gearButton" onClick={()=>{handleItemSelect(eChest.itemInstanceId, eChest.itemHash, 'equipped')}} sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${eChestDef?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                
              </Box>  
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton className="gearButton" onClick={()=>{handleItemSelect(eLegs.itemInstanceId, eLegs.itemHash, 'equipped')}} sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${eLegsDef?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                
              </Box>  
            </ListItemButton>
          </ListItem>
      </List>
      <Box sx={{height: '63vh', overflowY: 'scroll'}}>
        <h3 style={{marginBottom: 0}}>Helmets</h3>
        <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
      <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
        {helmetDefs?.map((item) => (
            <ListItemButton className="gearButton" key={item.itemInstanceId} onClick={()=>{handleItemSelect(item.itemInstanceId, item.itemHash, 'inventory')}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                
                </Box>  
            </ListItemButton>
          ))}
      </List>
      <h3 style={{marginBottom: 0}}>Gauntlet</h3>
      <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
      <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
        {gauntletDefs?.map((item) => (
            <ListItemButton className="gearButton" key={item.itemInstanceId} onClick={()=>{handleItemSelect(item.itemInstanceId, item.itemHash, 'inventory')}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                
                </Box>  
            </ListItemButton>
          ))}
      </List>
      <h3 style={{marginBottom: 0}}>Chest</h3>
      <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
      <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
        {chestDefs?.map((item) => (
            <ListItemButton className="gearButton" key={item.itemInstanceId} onClick={()=>{handleItemSelect(item.itemInstanceId, item.itemHash, 'inventory')}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                
                </Box>  
            </ListItemButton>
          ))}
      </List>
      <h3 style={{marginBottom: 0}}>Legs</h3>
      <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
      <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
        {legDefs?.map((item) => (
            <ListItemButton className="gearButton" key={item.itemInstanceId} onClick={()=>{handleItemSelect(item.itemInstanceId, item.itemHash, 'inventory')}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                
                </Box>  
            </ListItemButton>
          ))}
      </List>
      
      </Box>
    </div>
  )
}
