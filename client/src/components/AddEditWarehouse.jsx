import React, { Fragment } from "react";
import SubHeader from "./SubHeader";
import NavBar from './NavBar';
import axios from 'axios';
import WarehouseModel from '../models/WarehouseModel';
import '../styles/main.css';

export default class AddEditWarehouse extends React.Component {

    url = 'http://localhost:5000';
            
    constructor(props) {
        super(props);
        //console.log("state ", this.state);
        this.state = {
            formData: {
                name: "",
                address: "",
                city: "",
                country: "",
                contactName: "",
                position: "",
                phone: "",
                email: ""
            
            },
            editwarehouseId: props.location.state.id,
            pageTitle: props.location.state.title,
        };

        //console.log("props.location.state ", this.state);
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${this.url}/warehouses/${this.state.editwarehouseId}`);
            const resObj = response.data[0];
            const clone = this.state;
            clone.formData = {
                itemId: resObj.id,
                name: resObj.name,
                address: resObj.address,
                city: resObj.city,
                country: resObj.country,
                contactName: resObj.contact.name,
                position: resObj.contact.position,
                phone: resObj.contact.phone,
                email: resObj.contact.email
            
            };
            this.setState(clone);
            //console.log(clone.formData);

        } 
        catch (error) {
            console.error(error);
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);

        const model = new WarehouseModel(
            this.state.editwarehouseId ?? "", //id is to be created by the server
            data.get("name").toString(),
            data.get("address").toString(),
            data.get("city").toString(),
            data.get("country").toString(),
            {
                name: data.get("contactName").toString(),
                position: data.get("position").toString(),
                phone: data.get("phone").toString(),
                email: data.get("email").toString()
            }
        );
        console.log( model.toJSON())
        const method = this.props.location.state.id ? "PUT" : "POST"; // if no id is passed, POST will be used to create new record
        axios({
                method: method,
                url: `${this.url}/warehouses`,
                headers: { 'Content-Type': 'application/json' },
                data: model.toJSON()
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
        currentState.formData[event.target.name] = event.target.value;
        this.setState(currentState);
    }


    render() {
                
        return (
          <div>
            <NavBar />
            <Fragment>
              <div className="section-wrapper">
              <SubHeader title={this.state.pageTitle} />
                <div className="warehouse__form--wrapper">
                    <form
                        className="warehouse__form"
                        name="warehouseItemForm"
                        onSubmit={this.submitHandler} >
                        
                        <div className="warehouse__form--col-1">
                            <div className="warehouse__form-group">
                                <label htmlFor="name">Warehouse Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Warehouse Name"
                                    value={this.state.formData.name}
                                    required
                                    onChange={this.changeHandler} />
                            </div>

                            <div className="warehouse__form-group">
                                <label htmlFor="address">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    required
                                    value={this.state.formData.address}
                                    onChange={this.changeHandler} />
                            </div>

                            <div className="warehouse__form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={this.state.formData.city}
                                    onChange={this.changeHandler} />
                            </div>

                            <div className="warehouse__form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={this.state.formData.country}
                                    required
                                    onChange={this.changeHandler} />
                            </div>
                        </div>
                    
                        <h1>Contact Details</h1>
                        <div className="warehouse__form--col-2">

                            <div className="warehouse__form-group">
                                <label htmlFor="name">Contact Name</label>
                                <input
                                    placeholder="Contact Name"
                                    name="contactName"
                                    type="text"
                                    value={this.state.formData.contactName}
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                            <div className="warehouse__form-group">
                                <label htmlFor="position">Position</label>
                                <input
                                    placeholder="Position"
                                    name="position"
                                    value={this.state.formData.position}
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                                <div className="warehouse__form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    placeholder="Phone Number"
                                    type="tel"
                                    name="phone"
                                    value={this.state.formData.phone}
                                    onChange={this.changeHandler}
                                    required />
                            </div>

                                <div className="warehouse__form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={this.state.formData.email}
                                    onChange={this.changeHandler}
                                    required />
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