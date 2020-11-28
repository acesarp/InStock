import React, { Component } from "react";
// import "../styles/partials/navbar";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo/InStock-Logo.svg";

class NavBar extends Component {
  render() {
    return (
      <section className="nav">
        <div className="nav__bar">
          <div className="logo__link">
            <Link to={"/warehouses"}>
              <img className="logo__img" src={Logo} alt="InStock Logo" />
            </Link>
          </div>
          <div className="nav__tabs">
            <Link to={"/warehouses"}>
              <p className="nav__tabs--warehouses" href="">
                Warehouses
              </p>
            </Link>
            <Link to={"/inventory"}>
              <p className="nav__tabs--inventory" href="">
                Inventory
              </p>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
export default NavBar;
