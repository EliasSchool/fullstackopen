import React from "react";

const Addperson = (props) => {
    return (
    <form onSubmit={(event) => props.onSubmit(event, props.id)} >
    <div>
      name: <input onChange={props.handleNameChange}/>
    </div>
    <div>
      number: <input onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    )
  }

export default Addperson;