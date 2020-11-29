import AddEditInventory from './components/AddEditInventory';
import InventoryList from './components/InventoryList';
import WarehouseList from './components/WarehouseList';
import WarehouseDetails from './components/WarehouseDetails';
import AddEditWarehouse from './components/AddEditWarehouse';
import NavBar from './components/NavBar'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/main.css';
import axios from 'axios';
import React from 'react';

export default class App extends React.Component {
  state = { names: [] };

  componentDidMount() {
    const url = 'http://localhost:5000';

    axios.get(`${url}/warehouses/names`)
      .then(response => {
        this.setState({ names: response.data });
        //console.log(response.data);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="app">
          <BrowserRouter>
          <NavBar />
          <Switch>
            {/* Inventory routes */}
            <Route path="/inventory" component={InventoryList} exact />
            <Route path="/AddEditInventory" component={AddEditInventory} />
            <Route path="/ItemDetails/:itemId" component={WarehouseDetails} />
            
            {/* Warehouse routes */}
            <Route path="/warehouses" component={WarehouseList} />
            <Route path="/AddEditWarehouse" component={AddEditWarehouse} />
            <Route path="/warehouseDetails/:warehouseId" component={WarehouseDetails} />
          </Switch>

          </BrowserRouter>
      </div>
    );
  }
}
