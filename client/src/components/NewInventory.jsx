import React from 'react';
import axios from 'axios';
import InventoryModel from '../models/InventoryModel';
import '../styles/main.css';

export default class NewInventory extends React.Component {
    url = 'http://localhost:5000';
    category =  ["Apparel", "Gear", "Health", "Electronics"];
    constructor(props) {
        super(props);
        //console.log("state ", this.state);
        this.state = {
            formData: {
                itemName: "Test value item name",
                description: "Test value description",
                category: "",
                stockStatus: false,
                warehouseName: "",
                quantity: 0,  
            },
            warehouseData: props.location.state.warehouseData,
            editItemId: props.location.state.itemId,
            pageTitle: props.location.state.title
        };

        console.log("props.location.state ", this.props.location.state);
    }

    submitHandler = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        const warehouseName = data.get("warehouseName").toString();
        const warehouseID = this.props.location.state.warehouseData
            .filter(item => item.warehouseName === warehouseName)[0].warehouseID;

        const model = new InventoryModel(
            this.state.editItemId ?? "", //id is to be created by the server
            warehouseID,
            warehouseName,
            data.get("itemName").toString(),
            data.get("description").toString(),
            data.get("category").toString(),
            data.get("status").toString(),
            Number.parseInt(data.get("quantity").toString())
        );
        const method = this.props.location.state.itemId ? "PUT" : "POST"; // if no id is passed, POST will be used to create new record
        axios({
                method: method,
                url: `${this.url}/inventory`,
                headers: { 'Content-Type': 'application/json' },
                data: model.toJSON()
            })
            .then(response => {
            //console.info(response);
            event.target.reset();
            })
            .catch(error => console.error(error));

        // axios.post(`${this.url}/inventory`, model.toJSON(), {
        //     headers: { 'Content-Type': 'application/json' }
        //     })
        //     .then(response => {
        //         //console.info(response);
        //         event.target.reset();
        //     })
        //     .catch(error => console.error(error));
    }

    changeHandler = (event) => {
        //console.log([event.target.name], event.target.value);
        const currentState = this.state;
        this.setState({
            ...currentState,
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>                
                <h1>{ this.state.pageTitle }</h1>

                <form
                    name="inventoryItemForm"
                    onSubmit={this.submitHandler} >
                    <div>
                        <div>
                            <label htmlFor="itemName">Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                value={this.state.itemName}
                                required
                                onChange={this.changeHandler} />
                        </div>
                        <div>
                        <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                placeholder="Please enter a brief description..."
                                required
                                value={ this.state.description }
                                onChange={this.changeHandler} >
                            </textarea>            
                        </div>
                        <div>
                        <label htmlFor="category">Category</label>
                            <select name="category"
                                onChange={this.changeHandler} >
                                { this.category
                                    .map(item => <option key={ item } value={item}>{item}</option>)
                                }
                        </select>
                        </div>
                    </div>

            <div>
                    <div>
                            <input
                                type="radio"
                                name="status"
                                id="in-stock"
                                value="In stock"
                                onChange={this.changeHandler} />
                        <label htmlFor="in-stock">In stock</label>
                    </div>
                    <div>               
                            <input
                                type="radio"
                                name="status"
                                id="out-of-stock"
                                value="Out of stock"
                                onChange={this.changeHandler}
                                required />
                        <label htmlFor="out-of-stock">Out of stock</label>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                            <input
                                name="quantity"
                                type="number"
                                value={this.state.quantity}
                                onChange={this.changeHandler}
                                required />
                    </div>
                    
                    <div>
                    <label htmlFor="warehouseNameDropdown">Warehouse Name</label>
                            <select
                                id="warehouseNameDropdown-id"
                                name="warehouseName"
                                value={this.state.wareHouseName}
                                
                                onChange={this.changeHandler}
                                required >
                                {this.state.warehouseData && this.state.warehouseData.map(obj => {
                                    return <option id={ obj.warehouseID} key={obj.warehouseName} value={obj.warehouseName} > {obj.warehouseName}</option>;
                                }
                                
                                )}
                        </select>
                    </div>
            </div>
                    <div>
                        <input className="" type="submit" value="+Add Item" />
                        <input className="" type="reset" value="Cancel" />
                    </div>
                    
                </form>

            </div>
        );
    }
}