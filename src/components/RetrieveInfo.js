import React from 'react'
import { useContext } from 'react'
import {AppContext} from '../context/AppContext'
import useGetToken from '../hooks/useGetToken'
import useGetDMem from '../hooks/useGetDMem'
import useGetCharacters from '../hooks/useGetCharacters'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

//useSearchParams

export default function RetrieveInfo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const mycode = searchParams.get("code")
    console.log(mycode)
   
    const {token, setToken, dMemType, setDMemType, dMemId, setDMemId, setCharacterId} = useContext(AppContext)
    const navigate = useNavigate()

    const myToken = useGetToken(mycode)
    if(myToken){setToken(myToken)}
    
    

    const myDMem = useGetDMem(token)
    if(myDMem.dMemId){
        setDMemType(myDMem.dMemType)
        setDMemId(myDMem.dMemId)
    }

    let myChars = useGetCharacters(token, dMemType, dMemId)
    console.log(myChars)
    if(myChars){
        myChars = Object.values(myChars) 
        console.log( 'list of characters ' + myChars)
    }

    const handleCharacterSelect = (charId) =>{
        setCharacterId(charId)
        navigate('/inventory')
    }
    
    
 
        
    return (
        <>
            <h1>Choose Your Gaurdian</h1>
                <List >
                {myChars?.map((character) => (
                    <ListItem  key={character.characterId} disablePadding style={{display: 'block',mx: 'auto'}}>
                    <ListItemButton className='character' onClick={()=>{handleCharacterSelect(character.characterId)}} sx={{mx: 'auto', mb: 1, borderRadius: 2}} style={{backgroundImage: `url(https://bungie.net${character.emblemBackgroundPath})`, backgroundSize: 'cover', maxWidth: '500px', minHeight: '100px', mx: 'auto'}}>
                      <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                        <h3 style={{color: 'white', margin: 0}}>{character.classType===0? 'Titan':character.classType===1? 'Hunter':'Warlock'}</h3> 
                        <p style={{color: 'white', margin: 0}}>{character.raceType===0? 'Human':character.raceType===1? 'Awoken':'Exo'} {character.genderType === 0? 'Male': 'Female'}</p>
                      </Box>  
                    </ListItemButton>
                  </ListItem>
                       
                ))}
                </List>
         
        </>
    )


   

  
}
