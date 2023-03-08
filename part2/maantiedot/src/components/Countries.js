import React from "react";

const Countries = (props) => {
    return (
        <div>
            find countries<input type={"text"} onChange={props.handleSearch}></input>
        </div>
    )
}

export default Countries;