import { Box } from '@mui/material'
import React from 'react'

export default function MainDisplay({children}) {
  return (
    <Box sx={{maxWidth: '1000px', mx: 'auto', minHeight: '95vh',marginTop: '2vh', backgroundImage: 'url(https://res.cloudinary.com/dc0hokgpp/image/upload/v1661894921/72JEI9_pbxb6o.webp)', padding: 2, backgroundPosition: 'center', backgroundSize: 'cover'}}>
        { children }
    </Box>
  )
}
