import React from 'react'
import MainDisplay from '../components/MainDisplay'
import CreateBuild from '../components/CreateBuild'

export default function CreateBuildsView() {
  return (
    <MainDisplay>
    <div>
        <h1>Create Build</h1>
        <CreateBuild/>
    </div>
    </MainDisplay>
  )
}
