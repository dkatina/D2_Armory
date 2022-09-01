import React from 'react'
import MainDisplay from '../components/MainDisplay'
import DisplayBuilds from '../components/DisplayBuilds'

export default function BuildsView() {
  return (
    <MainDisplay>
    <div>
        <h1>My Builds</h1>
        <DisplayBuilds/>
        
    </div>
    </MainDisplay>
  )
}
