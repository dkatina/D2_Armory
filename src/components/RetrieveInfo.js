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
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material'

//useSearchParams

export default function RetrieveInfo() {
    const [searchParams] = useSearchParams();
    const mycode = searchParams.get("code")

    console.log(mycode)
   
    const {token, setToken, dMemType, setDMemType, dMemId, setDMemId, setCharacterId} = useContext(AppContext)
    const navigate = useNavigate()

    const myToken = useGetToken(mycode)
    console.log(myToken)
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

    if(!mycode){
        return(
            <Box sx={{ flexGrow: 1, marginTop: '10vh' }}>
              <Grid container rowSpacing={2} columnSpacing={3}>
              <Grid item xs={12} md={6} className="gridbox">
                <Box className="gridBox">
                <h1>Welcome Gaurdian</h1>
                <hr></hr>
                <p>Destiny 2 Armory, is companion app that unlocks your vaults potential while doing so much more.</p>
                <h4 style={{marginBottom: 0}}>You Can:</h4>
                <ul>
                    <li>Transfer Items to and from your vault, without needing to access a vault terminal</li>
                    <li>Inspect Gear Items and Compare stats</li>
                    <li>Mix and match gear to create builds, and equip those builds in real time</li>
                </ul>
                <p>Destiny's content is vast and varying, the builds function lets you efficiently tackle this varying content
                    with ease, by keeping your most sought after gear combinations at your finger tips. 
                </p>
                <p>Additionally, you ara now unshackled from the tower, and don't need to make the long journey back whenever
                    you left your favorite pair of boots behind.
                </p>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} className="gridbox">
              <Box className="gridBox">
                <h1>Getting Started</h1>
                <hr/>
                <p>This app requires authorization through the your bungie account 
                    to ensure that nobody touchs your stuff without your permission
                </p>
                <p>
                    To get started click the "Authorize" Button Below
                </p>
                <a href="https://www.bungie.net/en/OAuth/Authorize?client_id=41150&response_type=code" style={{textDecoration: 'none'}}>
                    <Button variant="contained" sx={{mx: 'auto', display: 'block'}}>Authorize</Button>
                </a>

                </Box>
              </Grid>
              <Grid item xs={12} className="gridbox">
                <Box className="gridBox">
                <h1>Development</h1>
                <hr></hr>
                <p>Alot is coming stay tuned</p>
                </Box>
              </Grid>
              </Grid>
            </Box>
        )
    }
    
    
 
        
    return (
        <Box sx={{ flexGrow: 1, marginTop: '5vh' }}>
            <h1>Choose Your Gaurdian</h1>
                <List className='characterBox' sx={{mx: 'auto', pt: 2}}>
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
         
        </Box>
    )


   

  
}
