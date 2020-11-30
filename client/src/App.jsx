import WarehouseList from "./components/WarehouseList";
import axios from "axios";
import React from "react";

export default class App extends React.Component {
  state = { names: [] };

  componentDidMount() {
    const url = "http://localhost:5000";

    axios
      .get(`${url}/warehouses/names`)
      .then((response) => {
        this.setState({ names: response.data });
        //console.log(response.data);
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <WarehouseList />
      </div>
    );
  }
}
