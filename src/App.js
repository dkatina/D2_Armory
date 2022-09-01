import NavBar from "./components/NavBar";
import BuildsView from "./views/BuildsView";
import HomeView from "./views/HomeView";
import InventoryView from "./views/InventoryView";
import PickCharacterView from "./views/PickCharacterView";
import VaultView from "./views/VaultView"
import { Route, Routes } from 'react-router-dom'
import Welcome from "./views/Welcome";
import InspectView from "./views/InspectView";
import CreateBuildsView from "./views/CreateBuildsView";
import './App.css'


function App() {
  return (
    <div className="App">
      <NavBar>

        <Routes>
          <Route path='/' element={<HomeView/>}/>
          <Route path='/inventory' element={<InventoryView/>}/>
          <Route path='/pick-character' element={<PickCharacterView/>}/>
          <Route path='/vault' element={<VaultView/>}/>
          <Route path='/createbuild' element={<CreateBuildsView/>}/>
          <Route path='/authorizing/' element={<Welcome/>}/>
          <Route path='/inspect-item/:itemId' element={<InspectView/>}/>
          <Route path='/builds' element={<BuildsView/>}/>
          


        </Routes>
        
      </NavBar>
    </div>
  );
}

export default App;
