import React from 'react';
import axios from 'axios';

export default class NewInventory extends React.Component {
    url = 'http://localhost:5000';

    submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        let formData = new FormData(e.target);
        axios.post(`${this.url}/inventory`, {
                data: formData
                })
            .then(response => {
                console.info(response);
                e.target.reset();
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div>                
                <h1>ADD NEW INVENTORY ITEM</h1>

                <form name="inventoryItem" onSubmit={ this.submitHandler }>
                    <div>
                        <div>
                            <label htmlFor="">Item Name</label>
                            <input type="text" name="itemName" required value="Test value item name" />
                        </div>
                        <div>
                        <label>Description</label>
                        <textarea name="description" placeholder="Please enter a brief description..." required value="Test value description"></textarea>            
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
                        <input type="radio" name="status" id="in-stock" value="In stock" />
                        <label htmlFor="in-stock">In stock</label>
                    </div>
                    <div>               
                        <input type="radio" name="status" id="out-of-stock" value="Out of stock"/>
                        <label htmlFor="out-of-stock">Out of stock</label>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="number" value="0"/>
                    </div>
                    
                    <div>
                    <label>Warehouse Name</label>
                            <select>
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