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
                this.setState({ list: response.data });
            })
            .catch(error => console.error(error));
    }

    // editHandler = (event) => {
    //     let data = event.target.value;
    //     axios.put(`${this.url}/warehouses`, {
    //             })
    //         .then(response => {
    //             this.setState(response.data);
    //         })
    //         .catch(error => console.error(error));
    // }

    /**
    *   
    * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
    */
    deleteHandler = (event) => {
        axios.delete(`${this.url}/warehouses/:id`)
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
        stateClone.warehouseId = event.target.dataset.warehousetargetid;
        stateClone.warehouseName = event.target.dataset.warehousetargetname;

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
                    stateClone.list = stateClone.list.filter(item => item.id !== response.data.deleted.id );
                    stateClone.warehouseName = response.data.deleted.warehouseName;
                    stateClone.message = `${response.data.deleted.warehouseName} deleted successfully!`;
                    stateClone.showCloseButton = true;
                    this.setState(stateClone);
                })
                .catch(error => {
                    stateClone.message = `Error: ${stateClone.warehouseName} could not be deleted.`;
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
        console.debug("Searching warehouse... => ", event.target.value);
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
            <> { /* <=== don't delete this tag!!! */ }
            <div>
            
            <NavBar />
            <div className="section-wrapper warehouseList">
                    <SubHeader
                        title={"Warehouses"}
                        searchHandler={ this.searchHandler }
                        buttonLabel={"+ Add New Warehouse"} />
                <table className="warehouseList__wrapper">
                    <thead>
                        <tr>
                            <th >
                                WAREHOUSE
                                <div onClick={(event) => this.sortHandler(event, "name") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th>
                                ADDRESS
                                <div onClick={(event) => this.sortHandler(event, "address") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                            </th>
                            <th>
                                CONTACT NAME
                                <div onClick={(event) => this.sortHandler(event, "contact.name") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                                </th>
                            <th>
                                CONTACT INFORMATION
                                <div onClick={(event) => this.sortHandler(event, "information") } ><img src={ `${this.iconFolder}/sort.svg` } alt="" /></div>
                                </th>
                            <th>
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.list && this.state.list.map(item => {
                            return (
                            <tr key={uuid()} id={item.id}>
                                    <td><Link to={`/warehouseDetails/${ item.id }`}>{item.name}</Link></td>
                                    <td>{item.address}</td>
                                    <td>{item.contact.name}</td>
                                    <td><div>{item.contact.phone}</div>
                                        <div>{item.contact.email}</div>
                                    </td>
                                    <td>{item.warhouseName}</td>
                                <td>
                                        <Link
                                            className="warehouseList__edit-btn"
                                            to={{
                                                pathname: `/AddEditWarehouse`,
                                                state: {
                                                    id: item.id,
                                                    title: "EDIT WAREHOUSE"
                                                }
                                            }}>
                                            <img src={`${this.iconFolder}/edit.svg`}
                                                alt="Edit icon" />
                                        </Link>
                                    <button className="delete-btn" onClick={this.deleteHandler}><img src={ `${this.iconFolder}/delete.svg` } alt="Delete icon" /></button>
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