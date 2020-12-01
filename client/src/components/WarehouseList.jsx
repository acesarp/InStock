import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import NavBar from './NavBar';
import SubHeader from './SubHeader';
import DeleteModal from './DeleteModal';

export default class WarehouseList extends React.Component {

    url = 'http://localhost:5000';
    iconFolder = `${process.env.PUBLIC_URL}/assets/Icons`;
    fullList = [];
    constructor() {
        super();
        this.state = {
            list: [],
            sortToggle: false,
            modalOpen: false,
            showCloseButton: false,
            warehouseName: "",
            warehouseId: "",
            message: ""
        };
    }
    
    componentDidMount() {
        axios.get(`${this.url}/warehouses`)
            .then(response => {
                let stateClone = this.state;
                stateClone.list = response.data;
                this.fullList = response.data;
                this.setState(stateClone);
            })
            .catch(error => console.error(error));
    }

    /**
     * 
    * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
    */
    deleteModalHandler = (event) => {
        let stateClone = this.state;
        stateClone.id = event.target.dataset.targetid;
        stateClone.name = event.target.dataset.targetname;

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

            axios.delete(`${this.url}/warehouses/${this.state.id}`)
                .then(response => {
                    console.log(response.data);
                    stateClone.list = stateClone.list.filter(item => item.id !== response.data.deleted.id );
                    stateClone.name = response.data.deleted.name;
                    stateClone.message = `${response.data.deleted.name} deleted successfully!`;
                    stateClone.showCloseButton = true;
                    this.setState(stateClone);
                })
                .catch(error => {
                    stateClone.message = `Error: ${stateClone.name} could not be deleted.`;
                    this.setState(stateClone);
                    console.error(error);
                });
        }
        else {
            stateClone.modalOpen = false;
            stateClone.id = "";
            stateClone.name = "";
            stateClone.message = "";
            stateClone.showCloseButton = false;
            this.setState(stateClone);
        }
    }

    /**
     * 
     * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event 
     * @param {string} key_
     *  
     */
    sortHandler = (event, key_) => {
        let currentList = this.state.list;

        let sortedList = currentList.sort((valueA, valueB) => this.compare(valueA, valueB, key_));
        const flipSort = this.state.sortToggle ? false : true;
        
        this.setState({ list: sortedList, sortToggle: flipSort });
    }

    /**
     * 
     * @param {string | Object} valueA
     * @param {string | Object} valueB 
     * @param {string} key_ 
     */
    compare = (valueA, valueB, key_) => {
        //console.log(valueA[key_], valueA);
        
        let keys = key_.split(".");

        for (let i = 0; i < keys.length; i++) {
            valueA = valueA[keys[i]];
            valueB = valueB[keys[i]];
        }

        if (valueA < valueB)
            return this.state.sortToggle ? -1 : 1;
        else if (valueA > valueB)
            return this.state.sortToggle ? 1 : -1;
        else
            return 0;
    }


    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    searchHandler = (event) => {
        console.debug("Searching warehouse... => ", event.target.value);
        let filteredList = [];
        let currentState = this.fullList;
        currentState.forEach((element) => {
            let result = (typeof element === 'object') ? JSON.stringify(element) : element.toString();
            let excludeWords = Object.keys(element).join('|');
            const regex = new RegExp(`,|{|}|:|${excludeWords}|"`, "g" );
           console.log(regex)
            result = result.replace(regex, ' ');
            console.log(result)
            if (result.toLowerCase().includes(event.target.value.toLowerCase(), 0)) {
                console.log(element);
                filteredList.push(element);
            }
        });
 
        this.setState({ list: filteredList });
    }

    render() {
        return (
            <> { /* <=== don't delete this tag!!! */ }
            <div>
            
            <NavBar />
            <div className="section-wrapper">
                    <SubHeader
                        title={"Warehouses"}
                        warehouseData={"no data"}  
                        searchHandler={this.searchHandler}
                        route={ "/AddEditWarehouse"}
                        buttonLabel={"+ Add New Warehouse"} />
                <table className="warehouse-list">
                    <thead>
                        <tr className="warehouse-list__header">
                            <th className="table-title table-title--tablet">
                                WAREHOUSE
                                <div onClick={(event) => this.sortHandler(event, "name") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th className="table-title table-title--tablet">
                                ADDRESS
                                <div onClick={(event) => this.sortHandler(event, "address") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th className="table-title table-title--tablet">
                                CONTACT NAME
                                <div onClick={(event) => this.sortHandler(event, "contact.name") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                                </th>
                            <th className="table-title table-title--tablet">
                                CONTACT INFORMATION
                                <div onClick={(event) => this.sortHandler(event, "contact.phone") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                                </th>
                            <th className="table-title table-title--tablet">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.list && this.state.list.map(item => {
                            return (
                            <tr className="warehouse-list__card" key={uuid()} id={item.id}>
                                <tr className="warehouse-list__box">
                                    <th className="table-title table-title--mobile">WAREHOUSE</th>
                                    <td><Link to={`/warehouseDetails/${ item.id }`}>{item.name}</Link></td>
                                </tr>
                                <tr className="warehouse-list__box">
                                    <th className="table-title table-title--mobile">ADDRESS</th>
                                    <td>{item.address}</td>
                                </tr>
                                <tr className="warehouse-list__box">
                                    <th className="table-title table-title--mobile">CONTACT NAME</th>
                                    <td>{item.contact.name}</td>
                                </tr>
                                <tr className="warehouse-list__box">
                                <th className="table-title table-title--mobile">CONTACT INFORMATION</th>
                                    <td><div>{item.contact.phone}</div>
                                        <div>{item.contact.email}</div>
                                    </td>
                                </tr>
                                    {/* <td>{item.warhouseName}</td> */}
                                    <td>
                                        <button
                                            className="warehouseList__delete-btn"
                                            onClick={this.deleteModalHandler}>
                                            <img src={`${this.iconFolder}/delete.svg`}
                                               data-targetid={ item.id }
                                                data-targetname={ item.name }
                                                alt="Delete icon" />
                                        </button>

                                        <Link
                                            className="warehouseList__edit-btn"
                                            to={{
                                                pathname: `/addeditwarehouse`,
                                                state: {
                                                    id: item.id,
                                                    title: "EDIT WAREHOUSE"
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
            </div>
                { this.state.modalOpen &&
                    <DeleteModal
                        name={this.state.warehouseName}
                        listType={ "Warehouse" }
                        clickModalHandler={ this.confirmationHandler }
                        message={ this.state.message }
                        showCloseButton={this.state.showCloseButton}
                    />
                    }
                </> /* <=== don't delete this tag!!! */ 
        );
    }
}