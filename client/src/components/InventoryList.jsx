import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import SubHeader from './SubHeader';
import DeleteModal from './DeleteModal';
import '../styles/main.css';

export default class InventoryList extends React.Component {
    idItemToDelete = "";
    url = 'http://localhost:5000';
    iconFolder = `${process.env.PUBLIC_URL}/assets/Icons`;
    fullList = [];

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sortToggle: false,
            modalOpen: false,
            deleteConfirmation: false,
            item: ""
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

 /**
 * 
* @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
*/
deleteModalHandler = (event) => {
    let stateClone = this.state;
    this.idItemToDelete = event.target.dataset.itemtarget;
    this.itemNameToDelete = stateClone.list.filter(item => item.id === this.idItemToDelete)[0];

    stateClone.modalOpen = true;

    this.setState(stateClone);
}

/**
 * 
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
 */
    confirmationHandler = (event) => {
        event.preventDefault();
        let stateClone = this.state;

        if (event.target.value === "delete") {
        
            stateClone.deleteConfirmation = true;

            axios.delete(`${this.url}/inventory/${this.idItemToDelete}`)
                .then(response => {
                    stateClone.list = stateClone.list.filter(item => item.id !== response.data.id);
                    stateClone.message = `${response.data.itemName} deleted successfully!`;
                })
                .catch(error => {
                    stateClone.message = `Error: ${stateClone.itemName} could not be deleted.`;
                    console.error(error);
                });
        }
        this.setState(stateClone);
        stateClone.modalOpen = false;
        this.idItemToDelete = "";
    }

    /**
     * 
     * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event 
     * @param {string} key
     *  
     */
    sortHandler = (event, key) => {        
        let currentList = this.state.list;
        let sortedList = currentList.sort((valueA, valueB) => this.compare(valueA, valueB, key));
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
            <div className="inventoryList">
                <SubHeader title={"Inventory"}
                    searchHandler={this.searchHandler}
                    warehouseList={this.fullList
                        .map(item => {
                            //console.log(item);
                            return { warehouseID: item.warehouseID, warehouseName: item.warehouseName };
                        })}
                    route="/newinventoryitem"
                    buttonLabel={"+ Add New Item"} />
                <table className="inventoryList__wrapper" >

                    <thead className="inventoryList__header">
                        <tr className="inventoryList__row">
                            <th className="inventoryList__cell--header">
                                INVENTORY ITEM
                                <div onClick={(event) => this.sortHandler(event, "itemName") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th className="inventoryList__cell--header">
                                CATEGORY
                                    <div><img onClick={(event) => this.sortHandler(event, "category") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                                </th>
                            <th className="inventoryList__cell--header">
                                STATUS
                                <div><img onClick={(event) => this.sortHandler(event, "status") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div> 
                            </th>
                            <th className="inventoryList__cell--header">
                                QTY
                                <div><img onClick={(event) => this.sortHandler(event, "quantity") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th className="inventoryList__cell--header">
                                WAREHOUSE
                                <div><img onClick={(event) => this.sortHandler(event, "warehouseName") } src={ `${this.iconFolder}/sort.svg` } alt="" /></div>     
                            </th>
                            <th className="inventoryList__cell--header">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list && this.state.list.map(item => {
                            return (
                            <tr className="inventoryList__row" key={uuid()} id={item.id}>
                                    <td className="inventoryList__cell" >{item.itemName}</td>
                                    <td className="inventoryList__cell" >{item.category}</td>
                                    <td className="inventoryList__cell" >{item.status}</td>
                                    <td className="inventoryList__cell" >{item.quantity}</td>
                                    <td className="inventoryList__cell" >{item.warehouseName}</td>
                                    <td className="inventoryList__cell">

                                        <button onClick={this.deleteModalHandler}>
                                            <img src={`${this.iconFolder}/delete.svg`}
                                                data-itemtarget={ item.id }
                                                alt="Delete icon" />
                                        </button>
                                        <button onClick={this.editHandler}>
                                            <img src={`${this.iconFolder}/edit.svg`}
                                                alt="Edit icon" />
                                        </button>
                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                { this.state.modalOpen &&
                    <DeleteModal
                        confirmationHandler={this.confirmationHandler}
                        item={this.state.item}
                        message={this.state.message} />
                }
            </div>
        );
    }
}