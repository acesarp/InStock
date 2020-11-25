import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WarehouseDetails from './WarehouseDetails';
export default class WarehouseList extends React.Component {
    url = 'http://localhost:5000';
    
    constructor() {
        super();
        this.state = {
            list: []
        };
    }
    
    componentDidMount() {
        axios.get(`${this.url}/warehouses`)
            .then(response => {
                
                this.setState({ list: response.data });
            })
            .catch(error => console.error(error));
    }

    editHandler = () => {
        axios.put(`${this.url}/warehouses`, {
                })
            .then(response => {
                this.setState(response.data);
            })
            .catch(error => console.error(error));
    }
    deleteHandler = () => {
        axios.delete(`${this.url}/warehouses/:id`)
            .then(response => {
                this.setState(response.data);
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <h1>Warehouses</h1>
                <table>
                    <thead>
                        <tr>
                            <th>WAREHOUSE</th>
                            <th>ADDRESS</th>
                            <th>CONTACT NAME</th>
                            <th>CONTACT INFORMATION</th>
                            <th>ACTIONS </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list && this.state.list.map(item => {
                            return (
                            <tr key={item.id} id={item.id}>
                                    <td><Link to="/wareHouseDetails" component={(item) => <WarehouseDetails warehouseId={ item.id } />} />{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.contact.name}</td>
                                    <td><div>{item.contact.phone}</div>
                                        <div>{item.contact.email}</div>
                                    </td>
                                    <td>{item.warhouseName}</td>
                                <td>
                                        <button onClick={this.editHandler}><img src={ `${process.env.dirname}/public/incons/delete-outline-24px.svg` } alt="Edit icon" /></button>
                                    <button onClick={this.deleteHandler}><img src="" alt="Delete icon" /></button>
                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
            </div>
        );
    }
}