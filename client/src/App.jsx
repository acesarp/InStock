import InventoryList from './components/InventoryList';
import WarehouseList from './components/WarehouseList';
import NewInventory from './components/NewInventory';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import React from 'react';
import WarehouseDetails from './components/WarehouseDetails';

export default class App extends React.Component {
  state = { names: [] }
  
  componentDidMount() {
    const url = 'http://localhost:5000';
      
    axios.get(`${url}/warehouses/names`)
      .then(response => { 
        this.setState({ names: response.data });
        //console.log(response.data);
      })
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route path="/" component={ InventoryList } exact/>
            <Route path="/wareHouseList" component={ WarehouseList } />
            <Route path="/warehouseDetails" component={ WarehouseDetails } />
            <Route path="/newinventoryitem" component={() => <NewInventory warehouseNames = { this.state.names } /> } />
          </BrowserRouter>

        </header>
      </div>
    );
  }
}
