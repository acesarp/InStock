import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import SubHeader from './SubHeader';
import DeleteModal from './DeleteModal';
import NavBar from './NavBar';
import '../styles/main.css';

export default class InventoryList extends React.Component {
    url = 'http://localhost:5000';
    iconFolder = `${process.env.PUBLIC_URL}/assets/Icons`;
    fullList = [];

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            sortToggle: false,
            modalOpen: false,
            showCloseButton: false,
            itemName: "",
            itemId: "",
            message: ""
        };
    }
    
    componentDidMount() {
        const id = this.props.warehouseId ?? "";
        axios.get(`${this.url}/inventory/${id}`)
            .then(response => {
                //console.log(response.data);
                let stateClone = this.state;
                stateClone.list = response.data
                this.fullList = response.data;
                this.warehouseList = this.getWarehouseUniqueDataList();
                this.setState(stateClone);
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
        stateClone.itemId = event.target.dataset.itemtargetid;
        stateClone.itemName = event.target.dataset.itemtargetname;

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

            axios.delete(`${this.url}/inventory/${this.state.itemId}`)
                .then(response => {
                    stateClone.list = stateClone.list.filter(item => item.id !== response.data.deleted.id );
                    stateClone.itemName = response.data.deleted.itemName;
                    stateClone.message = `${response.data.deleted.itemName} deleted successfully!`;
                    stateClone.showCloseButton = true;
                    this.setState(stateClone);
                })
                .catch(error => {
                    stateClone.message = `Error: ${stateClone.itemName} could not be deleted.`;
                    this.setState(stateClone);
                    console.error(error);
                });
        }
        else {
            stateClone.modalOpen = false;
            this.setState(stateClone);
        }
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

    getWarehouseUniqueDataList() {
        //console.log(this.fullList);

        let keys = this.fullList.map(key => key.warehouseID)
        let uniqueList = this.fullList.filter((id, index) => !keys.includes(id.warehouseID, index+1))

        //console.log("uniqueList ", uniqueList)
        
        return uniqueList.map(item => {
                let obj = { warehouseID: item.warehouseID, warehouseName: item.warehouseName };
                console.log("obj ", obj);
                return obj;
            });
    }



    render() {
        console.log("message ", this.state.message);
        return (
          <div>
            <NavBar page='inventory'/>
            <> { /* <=== don't delete this tag!!! */ }
            <div className="section-wrapper inventoryList">
                <SubHeader title={"Inventory"}
                    searchHandler={ this.searchHandler }
                    warehouseData={this.warehouseList}  
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
                            { this.state.list && this.state.list.map(item => {
                                let key_ = uuid();
                                return (
                                    <tr className="inventoryList__row" key={key_} id={item.id}>
                                            <td className="inventoryList__cell" >{item.itemName}</td>
                                            <td className="inventoryList__cell" >{item.category}</td>
                                            <td className="inventoryList__cell" >{item.status}</td>
                                            <td className="inventoryList__cell" >{item.quantity}</td>
                                            <td className="inventoryList__cell" >{item.warehouseName}</td>
                                            <td className="inventoryList__cell">

                                            <button
                                                className="inventoryList__delete-btn"
                                                onClick={this.deleteModalHandler}>
                                                    <img src={ `${this.iconFolder }/delete.svg` }
                                                        data-itemtargetid={ item.id }
                                                        data-itemtargetname={ item.itemName }
                                                        alt="Delete icon" />
                                                </button>
                                                <Link
                                                    className="inventoryList__edit-btn"
                                                    to={{
                                                        pathname: `/AddEditInventory`,
                                                        state: {
                                                            id: item.id,
                                                            warehouseData: this.warehouseList,
                                                            title: "EDIT INVENTORY ITEM"
                                                        }
                                                    }}>
                                                    <img src={`${this.iconFolder}/edit.svg`}
                                                        alt="Edit icon" />
                                                </Link>
                                                
                                        </td>
                                    </tr>
                                )
                        })}
                    </tbody>
                </table>

            </div>
                { this.state.modalOpen &&
                    <DeleteModal
                        name={this.state.itemName}
                        listType={ "Inventory" }
                        clickModalHandler={ this.confirmationHandler }
                        message={ this.state.message }
                        showCloseButton={ this.state.showCloseButton } />
                    }
                </> {/* <=== don't delete this tag!!! */ }
          </div>
        );
    }
}