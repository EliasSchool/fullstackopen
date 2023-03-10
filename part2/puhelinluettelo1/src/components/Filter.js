import React from "react"

const Filter = ( { handleFilter, text}) => {
    return ( 
      <form>
          filter shown with<input onChange={handleFilter}></input>
        </form>
    )
  }


export default Filter