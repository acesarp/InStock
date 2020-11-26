import React from 'react';
import axios from 'axios';
import InventoryModel from '../models/InventoryModel';
export default class NewInventory extends React.Component {
    url = 'http://localhost:5000';

    constructor(props) {
        super(props);
        this.state = {
            itemName: "Test value item name",
            description: "Test value description"
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(event.target);
        let data = new FormData(event.target);
        
        const model = new InventoryModel(
            this.props.id,
            this.props.warehouseId,
            this.props.warehouseName,
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
                            <label htmlFor="">Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                value={this.state.itemName}
                                required
                                onChange={this.changeHandler} />
                        </div>
                        <div>
                        <label>Description</label>
                            <textarea
                                name="description"
                                placeholder="Please enter a brief description..."
                                required
                                value={ this.state.description }
                                onChange={this.changeHandler} ></textarea>            
                        </div>
                        <div>
                        <label>Category</label>
                        <select name="category">
                            <option value="">f</option>
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
                        <label>Quantity</label>
                            <input
                                type="number"
                                value={this.state.uantity}
                                onChange={this.changeHandler}
                                required
                                />
                    </div>
                    
                    <div>
                    <label>Warehouse Name</label>
                            <select
                                value={this.state.wareHouseName}
                                required >
                                {this.props.wareHouseNames && this.props.wareHouseNames.forEach(element => {
                                    console.log("element ", element); 
                                    <option value={element}>{element}</option>
                                })}
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