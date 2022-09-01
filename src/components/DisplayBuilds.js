import React from 'react'
import { useContext, useState } from 'react'
import useGetBuilds from '../hooks/useGetBuilds'
import { AppContext } from '../context/AppContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/material'
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { getItemDefinition, getItemInstance, transferItem, equipItems} from '../api/tokenAuth'
import { CancelToken } from 'apisauce'
import { Button } from '@mui/material';
import { deleteBuild } from '../api/buildsAPI';

export default function DisplayBuilds() {
    const {token, dMemType, dMemId, characterId} = useContext(AppContext)
    const [selectedBuild, setSelectedBuild] =useState('')
    const [buildDefs, setBuildDefs] =useState('')
    const navigate = useNavigate()
    
    const builds = useGetBuilds(characterId)
    console.log(builds)

    const source = CancelToken.source()
    const defineItem = async (hash) =>{
        const r = await getItemDefinition(token, hash, source.token)
        console.log(r)
        return r.item
    }

    const handleBuildSelect= async (build)=>{
        console.log(build)
        let itemHashes = build.item_hashes.split('-')
        let myItemDefs = []
        for (let hash of itemHashes){
            let thisDef = await defineItem(hash)
            myItemDefs.push(thisDef)
        }
        setSelectedBuild(build)
        setBuildDefs(myItemDefs)
        return(source.cancel())
    }

    const handleDelete= async(build)=>{
        console.log(build)
        let response = await deleteBuild(build.build_id, source.token)
        console.log(response)
        setBuildDefs('')
        setSelectedBuild('')
        return(source.cancel())
    }

    const handleEquip= async(build)=>{
        let readyItems = []
        let exotic = ''
        const itemIds = build.items.split('-')
        const itemHashes = build.item_hashes?.split('-')
        console.log(itemIds, itemHashes)
        for (let i = 0; i < itemIds.length; i++){
            let location = await getItemInstance(token, dMemType, dMemId, itemIds[i], source.token)
            console.log(location)
            if (location?.item === 16){
                console.log('transfering item')
                const payload ={
                    characterId: characterId,
                    itemId: itemIds[i],
                    itemReferenceHash: parseInt(itemHashes[i]),
                    membershipType: dMemType,
                    statckSize: 1,
                    transferToVault: false
                }
                let transferStatus = await transferItem(token, payload, source.token)
                console.log(transferStatus)
            }
            let isExotic = await getItemInstance(token, dMemType, dMemId, itemIds[i], source.token)
            if (isExotic?.item === 2){
                exotic = itemIds[i]
                console.log(exotic)
            }else{
            readyItems.push(itemIds[i])
        }}
        if(exotic){readyItems.push(exotic)}
        
        console.log('ready items', readyItems)
        let finalPayload = {
            characterId: characterId,
            itemIds: readyItems,
            membershipType: dMemType
        }
        let equipStatus = await equipItems(token, finalPayload, source.token)
        console.log(equipStatus)
    }


    

    if (!builds){
        return (
            <Box sx={{marginLeft: '48%', marginTop: '40%'}}>
                <CircularProgress sx={{mx: 'auto'}}/>
            </Box>
        )
      } 

    if (buildDefs){
        return (
            <Box>
                <h1>{selectedBuild.title}</h1>
                <List sx={{display: 'flex'}}>
                    {buildDefs?.map((item) => (
                        <ListItem  disablePadding >
                        <ListItemButton  sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                        </Box>  
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                <Button onClick={()=>{setBuildDefs('')}}>Back</Button>
                <Button onClick={()=>{handleEquip(selectedBuild)}}>Equip</Button>
                <Button onClick={()=>{handleDelete(selectedBuild)}}>Delete</Button>

            </Box>
            


        )


    }


  return (
    <>
            <List >
            {builds?.map((build) => (
                <ListItem  key={build.build_id} disablePadding style={{display: 'block',mx: 'auto'}}>
                <ListItemButton className='character' onClick={()=>{handleBuildSelect(build)}} sx={{mx: 'auto', mb: 1, borderRadius: 2}} style={{backgroundImage: `url(https://res.cloudinary.com/dc0hokgpp/image/upload/v1662049541/destiny_2_warlock_solar_svj4wv.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', maxWidth: '500px', minHeight: '100px', mx: 'auto'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                    <h3 style={{color: 'white', margin: 0}}>{build.title}</h3> 
                    
                    </Box>  
                </ListItemButton>
                </ListItem>
                    
            ))}
            </List>
            <IconButton sx={{display:'block',mx: 'auto'}} onClick={()=>{navigate('/createbuild')}}>
                <AddCircleOutlineIcon sx={{fontSize: '40px', color:'white'}}/>
            </IconButton>

         
        </>
  )
}
