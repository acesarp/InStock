import React from 'react';
import InventoryList from './InventoryList';

export default class WarehouseDetails extends React.Component {
    url = 'http://localhost:5000';

     
    render() {
        return (
            <div>
                <div>
                    <div>WAREHOUSE ADDRESS:</div>
                    <div>{ this.props.wareHouse && this.props.wareHouse.address }</div>
                </div>
                <div>
                <div>CONTACT NAME</div>
                    <div>{ this.props.contact.wareHouse.name }</div>
                    <div>{ this.props.contact.position }</div>
                </div>
                <div>
                <div>CONTACT information</div>
                    <div>{this.props.contact.phone}</div>
                    <div>{ this.props.contact.email }</div>
                </div>
                <InventoryList  warehouseId={this.props && this.props.warehouseId}/>
            </div>
        );
    }
}