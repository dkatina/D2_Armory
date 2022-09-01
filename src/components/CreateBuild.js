import { Box, Button } from '@mui/material'
import React from 'react'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import useGetCharacterItems from '../hooks/useGetCharacterItems'
import useGetItemDefinition from '../hooks/useGetItemDefinition'
import useGetVaultItems from '../hooks/useGetVaultItems'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { getItemDefinition } from '../api/tokenAuth'
import { CancelToken } from 'apisauce'
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextField } from '@mui/material'
import useCreateBuild from '../hooks/useCreateBuild'

const FormSchema = Yup.object({
  buildName: Yup.string().required()
})

const initialValues={
  buildName:'',
}



export default function CreateBuild() {

  const {token, characterId, storedInventory, setStoredInventory, storedVault, setStoredVault} = useContext(AppContext)
    const [helmetDefs, setHelmetDefs] = useState('')
    const [gauntletDefs, setGauntletDefs] = useState('')
    const [chestDefs, setChestDefs] = useState('')
    const [legDefs, setLegDefs] = useState('')
    const [vaultItemDefs, setVaultItemDefs] = useState('')

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

    if(eLegsDef){
    eLegsDef.itemInstanceId = eLegs?.itemInstanceId
    eLegsDef.itemHash = eLegs?.itemHash
  }
    if(eHelmetDef){
      eHelmetDef.itemInstanceId = eHelmet?.itemInstanceId
      eHelmetDef.itemHash = eHelmet?.itemHash
  }
  if(eChestDef){
    eChestDef.itemInstanceId = eChest?.itemInstanceId
    eChestDef.itemHash = eChest?.itemHash
  }

  if(eGauntletsDef){
    eGauntletsDef.itemInstanceId = eGauntlets?.itemInstanceId
    eGauntletsDef.itemHash = eGauntlets?.itemHash
  }


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
    
  

    const vault = useGetVaultItems(token)
    
    let equippable

   
    equippable = vault?.filter(item => item.bucketHash === 138197802)
  

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
    let totalHelmets = []
    let totalGauntlets = []
    let totalChests = []
    let totalLegs = []
    if(vaultItemDefs?.length > 0 && helmetDefs && chestDefs && gauntletDefs && legDefs && eHelmetDef && eChestDef && eGauntletsDef && eLegsDef){
        const vaultGauntlets = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Gauntlets')
        const vaultLegs = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Leg Armor')
        const vaultChest = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Chest Armor')
        const vaultHelmet = vaultItemDefs?.filter(item => item.itemTypeDisplayName === 'Helmet')
        vaultArmor = vaultArmor.concat(vaultGauntlets, vaultLegs, vaultChest, vaultHelmet)
        totalHelmets = totalHelmets.concat(vaultHelmet, helmetDefs, eHelmetDef)
        totalGauntlets = totalGauntlets.concat(vaultGauntlets, gauntletDefs, eGauntletsDef)
        totalChests = totalChests.concat(vaultChest, chestDefs, eChestDef)
        totalLegs = totalLegs.concat(vaultLegs, legDefs, eLegsDef)
    }

  
    console.log(totalHelmets)
    console.log(totalChests)
    console.log(totalGauntlets)
    console.log(totalLegs)

    const [buildHelmet, setBuildHelmet] = useState('')
    const [buildGauntlets, setBuildGauntlets] = useState('')
    const [buildChest, setBuildChest] = useState('')
    const [buildLegs, setBuildLegs] = useState('')


    const handleItemSelect = () =>{}

    const handleHelmetSelect =(helmet)=>{
      setBuildHelmet(helmet)
    }

    const handleChestSelect =(chest)=>{
      setBuildChest(chest)
    }

    const handleGauntletSelect =(gauntlets)=>{
      setBuildGauntlets(gauntlets)
    }

    const handleLegsSelect = (legs)=>{
      setBuildLegs(legs)
    }

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: FormSchema,
      onSubmit: (values)=> handleSubmit(values)
    })

    const [payload, setPayload] = useState('')
    useCreateBuild(payload, setPayload)

    
    const handleSubmit=(values)=>{
      console.log(values)
      let buildPayload = {
        character_id : characterId,
        items: `${buildHelmet.itemInstanceId}-${buildGauntlets.itemInstanceId}-${buildChest.itemInstanceId}-${buildLegs.itemInstanceId}`,
        item_hashes: `${buildHelmet.itemHash}-${buildGauntlets.itemHash}-${buildChest.itemHash}-${buildLegs.itemHash}`,
        title: values.buildName
      }
      console.log(buildPayload)
      setPayload(buildPayload)
    }
    
  return (
    <Box>
        <List sx={{display: 'flex'}}>
          {buildHelmet ?
            <ListItem  disablePadding >
            <ListItemButton  sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${buildHelmet?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
              </Box>  
            </ListItemButton>
          </ListItem>: ''
          }
          {buildGauntlets ?
            <ListItem  disablePadding >
            <ListItemButton  sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${buildGauntlets?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
              </Box>  
            </ListItemButton>
          </ListItem>: ''
          }
          {buildChest ?
            <ListItem  disablePadding >
            <ListItemButton  sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${buildChest?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
              </Box>  
            </ListItemButton>
          </ListItem>: ''
          }
          {buildLegs ?
            <ListItem  disablePadding >
            <ListItemButton  sx={{mx: 'auto', mb: 1, border: 5, borderColor: 'gray'}} style={{backgroundImage: `url(https://bungie.net${buildLegs?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px', mx: 'auto'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
              </Box>  
            </ListItemButton>
          </ListItem>: ''
          }
          
      </List>
        <Box sx={{height: '60vh', overflowY: 'scroll'}}>
                <h3 style={{marginBottom: 0}}>Helmets</h3>
                <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
              <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
                {totalHelmets?.map((item) => (
                    <ListItemButton key={item.itemInstanceId} onClick={()=>{handleHelmetSelect(item)}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                        
                        </Box>  
                    </ListItemButton>
                  ))}
              </List>
              <h3 style={{marginBottom: 0}}>Gauntlet</h3>
              <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
              <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
                {totalGauntlets?.map((item) => (
                    <ListItemButton key={item.itemInstanceId} onClick={()=>{handleGauntletSelect(item)}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                        
                        </Box>  
                    </ListItemButton>
                  ))}
              </List>
              <h3 style={{marginBottom: 0}}>Chest</h3>
              <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
              <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
                {totalChests?.map((item) => (
                    <ListItemButton key={item.itemInstanceId} onClick={()=>{handleChestSelect(item)}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                        
                        </Box>  
                    </ListItemButton>
                  ))}
              </List>
              <h3 style={{marginBottom: 0}}>Legs</h3>
              <hr style={{maxWidth: '350px', textAlign: 'left', marginLeft: 0}}/>
              <List style={{display: 'flex',flexDirection: 'row', maxWidth: '350px', flexWrap:'wrap'}}>
                {totalLegs?.map((item) => (
                    <ListItemButton key={item.itemInstanceId} onClick={()=>{handleLegsSelect(item)}} sx={{ m: 1, border: 5, borderColor: 'gray', borderRadius: '4px'}} style={{backgroundImage: `url(https://bungie.net${item?.displayProperties.icon})`, backgroundSize: 'cover', maxWidth: '100px', minHeight: '100px'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '75px'}}>
                        
                        </Box>  
                    </ListItemButton>
                  ))}
              </List>
        </Box>
        {buildHelmet && buildChest && buildGauntlets && buildLegs ? 
        <form onSubmit={formik.handleSubmit}>
            <TextField
            id='buildName'
            name='buildName'
            label='Build Name'
            placeholder='Build Name'
            value={formik.values.buildName}
            onChange={formik.handleChange}
            error = {formik.touched.buildName && Boolean(formik.errors.buildName)}
            helperText={formik.touched.buildName && formik.errors.buildName}
            fullWidth
            sx={{my: 1, color: 'white', backgroundColor: 'white', borderRadius: 1}}
        />
        <Button variant="contained" type='submit' sx={{maxWidth:'600px', width:'100%', mx: 'auto', display: 'block'}}>Create Build</Button>
        </form>: ''

        }
    </Box>
  )
}
