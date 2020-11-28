
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../styles/InStock-Logo_2x.png';

export default class NavBar extends Component {

    render(){
        return(
            <header className="header">
                <div className="nav" >
                    <div className="logo-link"><Link to={"/warehouses"}><img className="logo-img" src={ Logo } alt="InStock Logo"/></Link></div>
                    <div className="nav-wrapper">
                        <Link to={"/warehouselist"}>
                            <p className="nav__link--warehouses" >Warehouses</p>
                        </Link>
                        <Link to={"/inventorylist"}>
                            <p className="nav__link--inventory" >Inventory</p>
                        </Link>
                    </div>
                </div>
            </header>
        )
    }
}
