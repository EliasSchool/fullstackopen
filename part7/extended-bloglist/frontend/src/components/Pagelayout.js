import Menu from "./Menu"
import Notification from "./Notification"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const PageLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedBlogappUser")

    if (!loggedUser) {
      navigate("/login")
    }
  }, [navigate])
  return (
    <>
      <Menu />
      <h2>Blogs</h2>
      <Notification />
    </>
  )
}

export default PageLayout
