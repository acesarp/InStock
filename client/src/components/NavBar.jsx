import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (props) => {
  let iClass;
  let wClass;

  if (props.page === 'inventory') {
    iClass = 'active'
    wClass = 'inactive'
  } else {
    iClass = 'inactive'
    wClass = 'active'
  }

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <img className="nav__logo" src='/assets/Logo/InStock-Logo.svg' alt="logo" />
      
        <ul className="nav__menu">
          <li className={`nav__list-item nav__list-item--${wClass}`}>
            <Link className="labels nav__link" to="/warehouselist">Warehouses</Link>
          </li>

          <li className={`nav__list-item nav__list-item--${iClass}`}>
            <Link className="labels nav__link" to="/inventorylist">Inventory</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar