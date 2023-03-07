import React from "react"

const positiveStyles ={
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const negativeStyles ={
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}


const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes("removed"))
      return (
        <div style={negativeStyles} className='error'>
          {message}
        </div>
      )
      else {
        return (
            <div style={positiveStyles} className='error'>
              {message}
            </div>
          )
      }
    }

export default Notification