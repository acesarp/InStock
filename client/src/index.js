import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InventoryList from "./components/InventoryList";
import WarehouseList from "./components/WarehouseList";
import AddEditInventory from "./components/AddEditInventory";
import WarehouseDetails from "./components/WarehouseDetails";
import AddEditWarehouse from "./components/AddEditWarehouse";
import InventoryDetails from "./components/InventoryDetails";

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/inventorylist" component={InventoryList} />
        <Route path="/warehousedetails/:id" component={WarehouseDetails} />
        <Route path="/warehouselist" component={WarehouseList} />
        <Route path="/addeditinventory" component={AddEditInventory} />
        <Route path="/addeditwarehouse" component={AddEditWarehouse} />
        <Route path="/inventory/:id" component={InventoryDetails} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
