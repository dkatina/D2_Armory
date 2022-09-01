import React from 'react'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetItemStats from '../hooks/useGetItemStats'
import useGetItemDefinition from '../hooks/useGetItemDefinition'
import { AppContext } from '../context/AppContext'
import { Box } from '@mui/material'
import { CircularProgress } from '@mui/material';
import useTransferItems from '../hooks/useTransferItem'
import { Button } from '@mui/material'

export default function InspectItem() {
    const {token, dMemType, dMemId, characterId} = useContext(AppContext)
    let {itemId} = useParams()
    itemId = itemId.split('-')
    const itemInstanceId = itemId[0]
    const itemHash = itemId[1]
    const sendToVault = itemId[2] === 'inventory' ? true: itemId[2] === 'vault' ? false: 'no'
  
    let fakeObject = {}
    fakeObject.itemHash = itemHash
    fakeObject.itemInstanceId = itemInstanceId
    

    const stats = useGetItemStats(token, dMemType, dMemId, fakeObject)
    const looks = useGetItemDefinition(token, fakeObject)


    const [payload, setPayload] = useState('')
    useTransferItems(token, payload, setPayload)

    const potentialPayload ={
        characterId: characterId,
        itemId: itemInstanceId,
        itemReferenceHash: parseInt(itemHash),
        membershipType: dMemType,
        statckSize: 1,
        transferToVault: sendToVault
    }



    const handleTransfer=()=>{
        console.log('sending payload')
        setPayload(potentialPayload)
    }

  

    if (!stats || !looks){
        return (
            <Box sx={{ display:"flex"}}>
                <CircularProgress/>
            </Box>
        )
      } 




  return (
        <Box sx={{marginTop: '10vh'}}>
        <h1 style={{textAlign: 'center'}}>{looks.displayProperties.name}</h1>
        <Box sx={{backgroundImage: `url(https://bungie.net${looks?.screenshot})`, paddingLeft: 2, mx: 'auto', backgroundSize: 'cover', backgroundPosition: 'center', maxWidth: '600px', minHeight: '27vh', maxHeight: '300px'}}>
            <Box sx={{display: 'flex', paddingTop: '2vh'}}>
            <Box>
            <h4 style={{ marginTop: 0, marginBottom: 0}}>Intellect </h4>
            <h4 style={{ marginTop: 0, marginBottom: 0}}>Resiliance </h4>
            <h4 style={{ marginTop: 0, marginBottom: 0}}>Discipline </h4>
            <h4 style={{ marginTop: 0, marginBottom: 0}}>Recovery </h4>
            <h4 style={{ marginTop: 0, marginBottom: 0}}>Mobility </h4>
            <h4 style={{ marginTop: 0, marginBottom: 0}}>Strength </h4>
            </Box>
            <Box style={{width: '15%'}}>
                <hr style={{width: `${Object.values(stats)[0].value*10}%`, textAlign: 'left', marginBottom: 16, marginLeft: 4, height: 8, backgroundColor: 'green'}}></hr>
                <hr style={{width: `${Object.values(stats)[1].value*10}%`, textAlign: 'left', marginBottom: 16, marginLeft: 4, height: 8, backgroundColor: 'green'}}></hr>
                <hr style={{width: `${Object.values(stats)[2].value*10}%`, textAlign: 'left', marginBottom: 16, marginLeft: 4, height: 8, backgroundColor: 'green'}}></hr>
                <hr style={{width: `${Object.values(stats)[3].value*10}%`, textAlign: 'left', marginBottom: 16, marginLeft: 4, height: 8, backgroundColor: 'green'}}></hr>
                <hr style={{width: `${Object.values(stats)[4].value*10}%`, textAlign: 'left', marginBottom: 16, marginLeft: 4, height: 8, backgroundColor: 'green'}}></hr>
                <hr style={{width: `${Object.values(stats)[5].value*10}%`, textAlign: 'left', marginBottom: 16, marginLeft: 4, height: 8, backgroundColor: 'green'}}></hr>
            </Box>
            </Box>
        </Box>
        {sendToVault === 'no'? '':
        <Button onClick={()=>{handleTransfer()}} variant='contained' sx={{display:'block',mx: 'auto'}}>
           Send To {sendToVault? 'Vault': 'Inventory'}
        </Button>}
        </Box>
  )
}
