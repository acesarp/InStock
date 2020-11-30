import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function SubHeader(props) {
    const history = useHistory();
    const [state] = useState(props);
    //console.log("warehouseData ", props.warehouseData);

    const goBack = () => {
        history.goBack();
    }

    return (
        
        <div className="subHeader">

            <button
                className="back-button"
                onClick={ goBack }>
                <img src={`${process.env.PUBLIC_URL}/assets/Icons/back-arrow.svg`} alt="back arrow" />
            </button>
            <h1>{props.title}</h1>

            { props.searchHandler &&
                <form id="listSearch">
                    <input onChange={ props.searchHandler } name="search" placeholder="Search..." />
                </form>
            }
            
            { props.warehouseData &&
                <Link
                className=""
                to={{
                    pathname: state.route,
                    state: {
                        warehouseData: props.warehouseData,
                        title: props.title
                    }
                }} >
                    <div className="btn">
                        { state.buttonLabel }
                    </div>
                </Link>
            }

        </div>
    );
}

export default SubHeader;