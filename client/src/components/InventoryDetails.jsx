import React, {Component} from 'react';
import axios from 'axios';
import "../styles/main.css";
import NavBar from './NavBar';
import SubHeader from './SubHeader';
// import { Link } from 'react-router-dom';


export default class InventoryDetails extends Component {
    url = 'http://localhost:5000';
    iconFolder = `${process.env.PUBLIC_URL}/assets/Icons`;

    constructor(){
        super();
        this.state ={
            inventory:{}
        }
    }

    componentDidMount() {
        axios.get(`${this.url}/inventory/${this.props.match.params.id}`)
            .then(response => {
                
                this.setState({ inventory: response.data[0]});
            })
            .catch(error => console.error(error));
    }
    // editHandler = () => {
    //     axios.put(`${this.url}/inventory`, {
    //             //STUB To Do
    //             })
    //         .then(response => {
    //             this.setState(response.data);
    //         })
    //         .catch(error => console.error(error));
    // }

    render(){
        console.log(this.state.inventory);
        return(
            <div className="bigbox">
                <NavBar />
              <div className="section-wrapper">
                <div className ="details__name" >
               
                
                    <SubHeader
                        title={this.state.inventory.itemName}/>
                    {/* <h2>{this.state.inventory.itemName}</h2> */}
                <p className="details__name--edit"> edit                 <p className="details__name--edit-text"> Edit</p></p>
                
                
                <img src={`${this.iconFolder}/edit.svg`}                                                        />

                </div>               
                <div className="details">
                    <div className="details__column">
                        <div>
                            <p>ITEM DESCRIPTION:</p>
                            <p>{this.state.inventory.description}</p>
                        </div>
                        <div>
                            <p>CATEGORY:</p>
                            <p>{this.state.inventory.category}</p>
                        </div>
                    </div>
                    <div>
                        <div className="details__row">
                            <div >
                                <p>STATUS:</p>
                                <p>
                                    {this.state.inventory.status}
                                </p>
                            </div>
                            <div>
                              
                                <p>QUANTITY:</p>
                                <p>
                                {this.state.inventory.quantity}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                            <p>WAREHOUSE:</p>
                                <p>
                                    {this.state.inventory.warehouseName}
                                </p>
                            </div>
                    </div>
                </div>

                
                </div>
              
                

            </div>

            </div>

        );

    }
}
