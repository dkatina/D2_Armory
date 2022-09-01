import React from 'react'
import InventoryItems from '../components/InventoryItems'
import MainDisplay from '../components/MainDisplay'

export default function InventoryView() {
  return (
    <MainDisplay>
      <div>
          <h1>Inventory</h1>
          <InventoryItems/>
      </div>
    </MainDisplay>
  )
}
