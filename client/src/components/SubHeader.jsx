import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SubHeader(props) {
    const history = useHistory();

    const goBack = () => {
      history.goBack();
    }

    const [state] = useState(props);

    if (history.location.pathname !== '/warehouselist' && history.location.pathname !== '/inventorylist' && history.location.pathname !== '/') {
      return (
          <section className="sub-header">

              <button
                  className="sub-header__back-btn"
                  onClick={ goBack }>
                  <img src={`${process.env.PUBLIC_URL}/assets/Icons/back-arrow.svg`} alt="back arrow" />
              </button>
              <h1>{props.title}</h1>

              { props.searchHandler &&
                  <form className="sub-header__search-form" id="listSearch">
                      <input className="sub-header__search-field" onChange={ props.searchHandler } name="search" placeholder="Search..." />
                  </form>
              }
              
              { props.warehouseData &&
                  <Link
                  className="sub-header__link"
                  to={{
                      pathname: state.route,
                      state: {
                          warehouseData: props.warehouseData,
                          title: "ADD NEW WAREHOUSE ITEM"
                      }
                  }} >
                      <div className="sub-header__btn">
                          { state.buttonLabel }
                      </div>
                  </Link>
              }

        {props.warehouseList && (
          <Link className="sub-header__link" to={{ pathname: state.route }}>
            <div className="sub-header__btn">{state.buttonLabel}</div>
          </Link>
        )}
      </section>
      );
    } else {
      return(
        <section className="sub-header">
              <h1>{props.title}</h1>

              { props.searchHandler &&
                  <form className="sub-header__search-form" id="listSearch">
                      <input className="sub-header__search-field" onChange={ props.searchHandler } name="search" placeholder="Search..." />
                  </form>
              }
              
              { props.warehouseData &&
                  <Link
                  className="sub-header__link"
                  to={{
                      pathname: state.route,
                      state: {
                          warehouseData: props.warehouseData,
                          title: "ADD NEW INVENTORY ITEM"
                      }
                  }} >
                      <div className="sub-header__btn">
                          { state.buttonLabel }
                      </div>
                  </Link>
              }

        {props.warehouseList && (
          <Link className="sub-header__link" to={{ pathname: state.route }}>
            <div className="sub-header__btn">{state.buttonLabel}</div>
          </Link>
        )}
      </section>
      );
    }
}

export default SubHeader;