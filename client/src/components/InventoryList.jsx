import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export default class InventoryList extends React.Component {
    url = 'http://localhost:5000';
    iconFolder = `${process.env.PUBLIC_URL}/icons/`;
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }
    
    componentDidMount() {
        const id = this.props.warehouseId ?? "";
        axios.get(`${this.url}/inventory/:${id}`)
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

    /**
     * 
     * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event 
     * @param {string} key
     *  
     */
    sortHandler = (event, key) => {
        console.debug("click! ", key);
        let currentState = this.state.list;
        let sortedList = currentState.sort((a, b) => Compare(a, b, key));
        this.setState({ list: sortedList });

        function Compare(a, b, key) {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        }
    
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                INVENTORY ITEM
                                <div onClick={(event) => this.sortHandler(event, "itemName") } ><img src={ `${this.iconFolder}/sort-24px.svg` } alt="" /></div>
                                
                            </th>
                            <th>
                                CATEGORY
                                    <div><img onClick={(event) => this.sortHandler(event, "category") } src={ `${this.iconFolder}/sort-24px.svg` } alt="" /></div>
                                </th>
                            <th>
                                STATUS
                                <div><img onClick={(event) => this.sortHandler(event, "status") } src={ `${this.iconFolder}/sort-24px.svg` } alt="" /></div> 
                            </th>
                            <th>
                                QTY
                                <div><img onClick={(event) => this.sortHandler(event, "quantity") } src={ `${this.iconFolder}/sort-24px.svg` } alt="" /></div>
                            </th>
                            <th>
                                WAREHOUSE
                                <div><img onClick={(event) => this.sortHandler(event, "warehouseName") } src={ `${this.iconFolder}/sort-24px.svg` } alt="" /></div>     
                            </th>
                            <th>
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list && this.state.list.map(item => {
                            return (
                            <tr key={uuid()} id={item.id}>
                                    <td>{item.itemName}</td>
                                    <td>{item.category}</td>
                                    <td>{item.status}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.warehouseName}</td>
                                <td>
                                        <button onClick={this.editHandler}><img src={`${this.iconFolder}/edit-24px.svg`} alt="Edit icon" /></button>
                                    <button onClick={this.deleteHandler}><img src={`${this.iconFolder}/delete_outline-24px.svg`} alt="Delete icon" /></button>
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