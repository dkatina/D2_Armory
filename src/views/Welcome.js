import { Box } from '@mui/material'
import React from 'react'
import RetrieveInfo from '../components/RetrieveInfo'
import MainDisplay from '../components/MainDisplay'


export default function Welcome() {
  return (
    <MainDisplay>
    <Box sx={{maxWidth: 1000, mx: 'auto'}}>
        <RetrieveInfo/>
    </Box>
    </MainDisplay>
  )
}
