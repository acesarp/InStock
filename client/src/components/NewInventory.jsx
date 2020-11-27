import React from 'react';
import axios from 'axios';
import InventoryModel from '../models/InventoryModel';
import { v4 as uuid } from 'uuid';
import '../styles/main.css';

export default class NewInventory extends React.Component {
    url = 'http://localhost:5000';

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                itemName: "Test value item name",
                description: "Test value description",
                category: "",
                stockStatus: false,
                quantity: 0,  
            },

            warehouseNames: props.warehouseNames
        };
        console.log("warehouseList ", this.state.warehouseNames);
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(event.target);
        let data = new FormData(event.target);

        const model = new InventoryModel(

            uuid(),
            this.props.warehouseList.warehouseId,
            this.props.warehouseList.warehouseName,
            data.get("itemName").toString(),
            data.get("description").toString(),
            data.get("category").toString(),
            data.get("status").toString(),
            Number.parseInt(data.get("quantity").toString())
        );

        axios.post(`${this.url}/inventory`, {
            data: model.stringify()
                })
            .then(response => {
                console.info(response);
                event.target.reset();
            })
            .catch(error => console.error(error));
    }

    changeHandler = (event) => {
        console.log([event.target.name], event.target.value);
        const currentState = this.state;
        this.setState({
            ...currentState,
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>                
                <h1>ADD NEW INVENTORY ITEM</h1>

                <form name="inventoryItem" onSubmit={ this.submitHandler }>
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
                                onChange={this.changeHandler} ></textarea>            
                        </div>
                        <div>
                        <label htmlFor="category">Category</label>
                        <select name="category">
                            <option value=""></option>
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
                                required
                                />
                    </div>
                    
                    <div>
                    <label htmlFor="warehouseNames">Warehouse Name</label>
                            <select
                                id="warehouseNames-id"
                                name="warehouseNames"
                                value={this.state.wareHouseName}
                                onChange={this.changeHandler}
                                required >
                                <option value="Warehouse TEST" > Warehouse TEST </option>
                                {this.state.warehouseNames && this.state.warehouseNames.forEach(name => 
                                    <option key={ name } value={name} > {name}</option>
                                
                                )}
                        </select>
                    </div>
            </div>
                    <div>
                        <input type="submit" value="+Add Item" />
                        <input type="reset" value="Cancel" />
                    </div>
                    
                </form>

            </div>
        );
    }
}