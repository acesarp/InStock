import React from 'react';
import { Link } from "react-router-dom";
import InventoryList from './InventoryList';
import axios from 'axios';

export default class WarehouseDetails extends React.Component {
    iconFolder = `${process.env.PUBLIC_URL}/assets/Icons`;
    url = 'http://localhost:5000';
    constructor() {
        super();
        this.state = {
            warehouse: {
                id: "",
                name: "",
                address: "",
                city: "",
                country: "",
                contact: {
                    name: "",
                    position: "",
                    phone: "",
                    email: ""
                }
            }
        };
    }
    
    componentDidMount() {
        console.debug("warehouseId => ", this.props.match.params.warehouseId);
        axios.get(`${this.url}/warehouses/${this.props.match.params.warehouseId}`)
            .then(response => {
                this.setState({ warehouse: response.data[0]});
                console.debug(this.state.wareHouse, response.data[0]);
            })
            .catch(err => console.error(err));
    }

    render() {
        console.log(this.state.warehouse);
        return (

            <div className="warehouse-details__wrapper">
                <div>
                    <div>WAREHOUSE ADDRESS:</div>
                    <div>{this.state.warehouse.address}</div>
                    <div>{this.state.warehouse.city} { this.state.warehouse.country}</div>
                </div>
                <div>
                <div>CONTACT NAME</div>
                    <div>{ this.state.warehouse.contact.name }</div>
                    <div>{ this.state.warehouse.contact.position }</div>
                </div>
                <div>
                <div>CONTACT INFORMATION</div>
                    <div>{this.state.warehouse.contact.phone}</div>
                    <div>{ this.state.warehouse.contact.email }</div>
                </div>
                <Link
                    className="edit-btn"
                    to={{
                        pathname: `/AddEditWarehouse`,
                        state: {
                            id: this.props.match.params.warehouseId,
                            title: "Edit Warehouse"
                        }
                    }}>
                    <img src={`${this.iconFolder}/edit.svg`}
                        alt="Edit icon" />
                </Link>
                <InventoryList  warehouseId={this.state.id}/>
            </div>
        );
    }
}