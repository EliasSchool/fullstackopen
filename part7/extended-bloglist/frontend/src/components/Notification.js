import { useSelector } from "react-redux"
import { Alert } from "@mui/material"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null || notification === "") {
    return null
  }
  if (notification.toLowerCase().includes("error")) {
    return (
      <div className="error">
        <Alert severity="error">{notification}</Alert>
      </div>
    )
  }
  return (
    <div className="succeess">
      <Alert severity="success">{notification}</Alert>
    </div>
  )
}

export default Notification
