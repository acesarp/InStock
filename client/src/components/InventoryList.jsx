import React from 'react';
import axios from 'axios';

export default class InventoryList extends React.Component {
    url = 'http://localhost:5000';
    
    constructor() {
        super();
        this.state = {
            list: []
        };
    }
    
    componentDidMount() {
        axios.get(`${this.url}/inventory`)
            .then(response => {
                
                this.setState({ list: response.data });
            })
            .catch(error => console.error(error));
    }

    editHandler = () => {
        axios.put(`${this.url}/inventory`, {
                })
            .then(response => {
                this.setState(response.data);
            })
            .catch(error => console.error(error));
    }
    deleteHandler = () => {
        axios.delete(`${this.url}/inventory/:id`)
            .then(response => {
                this.setState(response.data);
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <h1>Inventory</h1>
                <table>
                    <thead>
                        <tr>
                        <th>INVENTORY ITEM</th>
                        <th>CATEGORY</th>
                        <th>STATUS</th>
                        <th>QTY</th>
                        <th>WAREHOUSE</th>
                            <th>ACTIONS </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list && this.state.list.map(item => {
                            return (
                            <tr key={item.id} id={item.id}>
                                    <td>{item.itemName}</td>
                                    <td>{item.category}</td>
                                    <td>{item.status}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.warhouseName}</td>
                                <td>
                                    <button onClick={this.editHandler}><img src="./public/incons/delete-outline-24px.svg" alt="Edit icon" /></button>
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