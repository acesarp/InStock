import React from 'react';
import InventoryList from './InventoryList';
import axios from 'axios';
import '../styles/main.css';

export default class WarehouseDetails extends React.Component {

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
                //console.debug(this.state.wareHouse, response.data[0]);
            })
            .catch(err => console.error(err));
    }

    render() {
        console.log(this.state.warehouse);
        return (

            <div className="warehouse-details__wrapper">
                <div>
                    <div>WAREHOUSE ADDRESS:</div>
                    <div>{ this.state.warehouse && this.state.warehouse.address }</div>
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
                <InventoryList  warehouseId={this.state.id}/>
            </div>
        );
    }
}