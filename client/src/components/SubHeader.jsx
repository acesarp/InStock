import React, { useState } from 'react';

function SubHeader(props) {
    const [state] = useState(props);

    return (
        
        <div className="subHeader">
            <h1>{ state.title }</h1>
            { state.buttonHandler &&
                <button className="btn" onClick={ state.buttonHandler }> { state.buttonLabel } jhh</button>
            }
            
            { state.searchHandler &&
                <form id="listSearch">
                    <input onChange={ state.searchHandler } name="search" placeholder="Search..." />
                </form>
            }
        </div>
    );
}

export default SubHeader;