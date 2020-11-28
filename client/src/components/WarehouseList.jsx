import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WarehouseDetails from './WarehouseDetails';
import { v4 as uuid } from 'uuid';
import SubHeader from './SubHeader';
export default class WarehouseList extends React.Component {
    url = 'http://localhost:5000';
    iconFolder = `${process.env.PUBLIC_URL}/assets/Icons`;
    fullList = [];
    constructor() {
        super();
        this.state = {
            list: []
        };
    }
    
    componentDidMount() {
        console.log("iconFolder ", this.iconFolder);
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

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    searchHandler = (event) => {
        console.debug("Searching... => ", event.target.value);
        let currentState = this.fullList;
        let filteredList = [];
        currentState.forEach((element) => {
            const keys = Object.keys(element);
            for (const key of keys) {
                if (element[key].toString().toLowerCase().includes(event.target.value, 0)) {
                    filteredList.push(element);
                    break;
                }
            }
        });
    }

    render() {
        return (
            <div>
                <SubHeader title={"Warehouses"} searchHandler={this.searchHandler} buttonLabel={ <img src={`${this.iconFolder}/edit.svg`} alt="" /> }/>
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
                            <tr key={uuid()} id={item.id}>
                                    <td><Link to={`/wareHouseDetails/${ item.id }`}>{item.name}</Link></td>
                                    <td>{item.address}</td>
                                    <td>{item.contact.name}</td>
                                    <td><div>{item.contact.phone}</div>
                                        <div>{item.contact.email}</div>
                                    </td>
                                    <td>{item.warhouseName}</td>
                                <td>
                                        <button className="" onClick={this.editHandler}><img src={ `${this.iconFolder}/edit.svg` } alt="Edit icon" /></button>
                                    <button className="" onClick={this.deleteHandler}><img src={ `${this.iconFolder}/delete.svg` } alt="Delete icon" /></button>
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