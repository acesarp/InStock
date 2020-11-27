import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import SubHeader from './SubHeader';

export default class InventoryList extends React.Component {

    url = 'http://localhost:5000';
    iconFolder = `${process.env.PUBLIC_URL}/assets/Icons`;
    fullList = [];
            state = {
            list: [],
            sortToggle: false
        };

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sortToggle: false
        };
    }
    
    componentDidMount() {
        const id = this.props.warehouseId ?? "";
        axios.get(`${this.url}/inventory/:${id}`)
            .then(response => {
                this.fullList = response.data;
                this.setState({ list: response.data });
            })
            .catch(error => console.error(error));
    }

    editHandler = () => {
        axios.put(`${this.url}/inventory`, {
                //STUB To Do
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
        let currentList = this.state.list;
        let sortedList = currentList.sort((a, b) => this.compare(a, b, key));
        const flipSort = this.state.sortToggle ? false : true;
        
        this.setState({ list: sortedList, sortToggle: flipSort });
    }
    /**
     * 
     * @param {string} valueA
     * @param {string} valueB 
     * @param {string} key 
     */
    compare = (valueA, valueB, key) => {
        if (valueA[key] < valueB[key])
            return this.state.sortToggle ? -1 : 1;
        else if (valueA[key] > valueB[key])
            return this.state.sortToggle ? 1 : -1;
        else
            return 0;
        }

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    searchHandler = (event) => {
        let currentState = [...this.fullList];
        let filteredList = [];
        
        currentState.forEach((element) => {
            const keys = Object.keys(element);
            for(const key of keys) {
                if (element[key].toString().toLowerCase().includes(event.target.value.toLowerCase(), 0)) {
                    filteredList.push(element);
                    break;
                }
            }
        });
        this.setState({ list: filteredList });
    }


    render() {
        return (
            <div className="InventoryList">
                <SubHeader title={"Inventory"}
                    searchHandler={this.searchHandler}
                    warehouseList={this.fullList
                        .map(item => {
                            //console.log(item);
                            return { warehouseID: item.warehouseID, warehouseName: item.warehouseName };
                        })}
                    route="/newinventoryitem"
                    buttonLabel={"+ Add New Item"} />
                <table>
                    <thead>
                        <tr>
                            <th>
                                INVENTORY ITEM
                                <div onClick={(event) => this.sortHandler(event, "itemName") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th>
                                CATEGORY
                                    <div><img onClick={(event) => this.sortHandler(event, "category") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                                </th>
                            <th>
                                STATUS
                                <div><img onClick={(event) => this.sortHandler(event, "status") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div> 
                            </th>
                            <th>
                                QTY
                                <div><img onClick={(event) => this.sortHandler(event, "quantity") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th>
                                WAREHOUSE
                                <div><img onClick={(event) => this.sortHandler(event, "warehouseName") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div>     
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
                                    <button onClick={this.editHandler}><img src={`${this.iconFolder}/edit.svg`} alt="Edit icon" /></button>
                                    <button onClick={this.deleteHandler}><img src={`${this.iconFolder}/delete.svg`} alt="Delete icon" /></button>
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