import React, { Fragment } from 'react';
import axios from 'axios';
import InventoryModel from '../models/InventoryModel';
import SubHeader from './SubHeader';
import NavBar from './NavBar';
import '../styles/main.css';

export default class NewInventory extends React.Component {
    url = 'http://localhost:5000';
    category = ["Apparel", "Gear", "Health", "Electronics"];
            
    constructor(props) {
        super(props);
        //console.log("state ", this.state);
        this.state = {
            formData: {
                itemName: "",
                description: "",
                category: "",
                status: "",
                warehouseName: "",
                quantity: 0,  
            },
            warehouseData: props.location.state.warehouseData,
            editItemId: props.location.state.id,
            pageTitle: props.location.state.title,
        };

        //console.log("props.location.state ", this.state);
    }

async componentDidMount() {
    if(!this.state.editItemId) {
    return;
  }
        try {
            const response = await axios.get(`${this.url}/inventory/${this.state.editItemId}`);
            const resObj = response.data[0];
            const clone = this.state;
            clone.formData = {
                itemId: resObj.id,
                warehouseName: resObj.warehouseName,
                itemName: resObj.itemName,
                description: resObj.description,
                category: resObj.category,
                status: resObj.status,
                quantity: resObj.quantity
            };
            this.setState(clone)
            console.log(clone.formData);

        } 
        catch (error) {
            console.error(error);
        }
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

        const method = this.props.location.state.id ? "PUT" : "POST"; // if no id is passed, POST will be used to create new record
        axios({
                method: method,
                url: `${this.url}/inventory`,
                headers: { 'Content-Type': 'application/json' },
                data: model.toJSON()
            })
            .then(response => {
                console.info(response);
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
        console.log([event.target.name], event.target.value);
        const currentState = this.state;
        currentState.formData[event.target.name] = event.target.value;
        this.setState(currentState);
    }



    render() {
        return (
          <div>
            <NavBar />
            <Fragment>
              <div className="section-wrapper">
              <SubHeader title={ this.state.pageTitle } />
                <div className="inventory__form-wrapper">

                    <form
                        className="inventory__form"
                        name="inventoryItemForm"
                        onSubmit={this.submitHandler} >
                        
                        <div className="inventory__form--col-2">
                            <div className="inventory__form-group">
                                <label htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    name="itemName"
                                    value={this.state.formData.itemName}
                                    required
                                    onChange={this.changeHandler} />
                            </div>

                            <div className="inventory__form-group">
                            <label htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Please enter a brief description..."
                                    required
                                    value={this.state.formData.description}
                                    onChange={this.changeHandler} >
                                </textarea>            
                            </div>

                            <div className="inventory__form-group">
                            <label htmlFor="category">Category</label>
                                <select name="category"
                                    value={ this.state.formData.category }
                                    onChange={this.changeHandler} >
                                    { this.category
                                        .map(item => <option key={ item } value={item}>{item}</option>)
                                    }
                            </select>
                            </div>
                        </div>

                        <div className="inventory__form--col-2">
                            <div className="inventory__form-group">
                            <input
                                type="radio"
                                name="status"
                                id="in-stock"
                                value="In Stock"
                                checked={ this.state.formData.status === "In Stock" }
                                onChange={this.changeHandler} />
                        <label htmlFor="in-stock">In stock</label>
                    </div>
                    <div className="inventory__form-group">               
                            <input
                                type="radio"
                                name="status"
                                id="out-of-stock"
                                value="Out of Stock"
                                checked={ this.state.formData.status === "Out of Stock" }
                                onChange={this.changeHandler}
                                required />
                        <label htmlFor="out-of-stock">Out of stock</label>
                            </div>
                            
                    <div className="inventory__form-group">
                        <label htmlFor="quantity">Quantity</label>
                            <input
                                name="quantity"
                                type="number"
                                value={this.state.formData.quantity}
                                onChange={this.changeHandler}
                                required />
                    </div>
                    
                    <div className="inventory__form-group">
                    <label htmlFor="warehouseName">Warehouse Name</label>
                            <select
                                id="warehouseName-id"
                                name="warehouseName"
                                value={this.state.formData.warehouseName}
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
                            <input className="btn" type="submit" value="Save" />
                            <input className="btn" type="reset" value="Cancel" />
                        </div>
                    
                    </form>
                </div>
              </div>
            </Fragment>
          </div>
        );
    }
}