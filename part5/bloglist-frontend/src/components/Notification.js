
const style = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const errorstyle = {
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
  if(message.toLowerCase().includes("error") ){
    return (
      <div className="error" style={errorstyle}>
        {message}
      </div>
    )
  }
  return (
    <div className="error" style={style}>
      {message}
    </div>
  )
}

export default Notification