import InventoryList from './components/InventoryList';
import WarehouseList from './components/WarehouseList';
import NavBar from './components/NavBar'
import NewInventory from './components/NewInventory';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/main.css';
import axios from 'axios';
import React from 'react';
import WarehouseDetails from './components/WarehouseDetails';

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
            <Route path="/inventory" component={InventoryList} exact />
            <Route path="/wareHouses" component={WarehouseList} />
            <Route path="/warehouseDetails/:warehouseId" component={WarehouseDetails} />
            <Route path="/newinventoryitem" component={NewInventory} />
          </Switch>

          </BrowserRouter>
      </div>
    );
  }
}
