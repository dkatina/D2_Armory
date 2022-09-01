import React from 'react'
import MainDisplay from '../components/MainDisplay'
import VaultItems from '../components/VaultItems'

export default function VaultView() {
  return (
    <MainDisplay>
    <div>
        <h1>Vault</h1>
        <VaultItems/>
    </div>
    </MainDisplay>
  )
}
