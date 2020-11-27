import React from 'react';
import InventoryList from './InventoryList';
import axios from 'axios';

export default class WarehouseDetails extends React.Component {

    url = 'http://localhost:5000';
    state = {
        wareHouse: {
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
    
    componentDidMount() {
        console.debug("warehouseId => ", this.props.warehouseId);
        axios.get(`${this.url}/warehouses/${this.props.warehouseId}`)
            .then(response => {
                this.setState({ ...response.data });
                console.debug(response.data);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <div>
                    <div>WAREHOUSE ADDRESS:</div>
                    <div>{ this.state.wareHouse && this.state.wareHouse.address }</div>
                </div>
                <div>
                <div>CONTACT NAME</div>
                    <div>{ this.state.wareHouse.contact.name }</div>
                    <div>{ this.state.wareHouse.contact.position }</div>
                </div>
                <div>
                <div>CONTACT information</div>
                    <div>{this.state.wareHouse.contact.phone}</div>
                    <div>{ this.state.wareHouse.contact.email }</div>
                </div>
                <InventoryList  warehouseId={this.state.id}/>
            </div>
        );
    }
}