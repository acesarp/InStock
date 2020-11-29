import React from 'react';
import { Link } from 'react-router-dom';


    const Navbar = (props) => {
        console.log(props);
        let iClass;
        let wClass;
        if (props.path === '/inventories') {
            iClass = 'inactive'
            wClass = 'active'
        }
         else {
            iClass = 'active'
            wClass = 'inactive'
        }
    
    return (
        <div className="nav">
        <img className="nav__logo" src='/assets/Logo/InStock-Logo.svg' alt="logo" />
        <nav className="nav__wrapper">
            <ul className="nav__menu">
            <li className={`nav__list-warehouses nav__list-warehouses--${wClass}`}>
                <Link className={`nav__list-link--${wClass}`} to="/warehouselist">Warehouses</Link>
            </li>
            <li className={`nav__list-inventory nav__list-inventory--${iClass}`}>
                <Link className={`nav__list-link--${iClass}`} to="/inventorylist">Inventory</Link>
            </li>
           
            </ul>
        </nav>
        </div>
    );
    }
export default Navbar

