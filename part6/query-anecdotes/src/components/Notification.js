import { useContext } from "react"
import anecdoteContext from "../anecdoteContext"

const Notification = () => {
  
  const [message, messageDispatch] = useContext(anecdoteContext)
  console.log(message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if(!message || message === "") {
    return null
  }

  setTimeout(() => messageDispatch({type: "CLEARNOTIF", payload: ""}), 5000)

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
