import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setLogout } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Button } from "@mui/material"
const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  if (!user) {
    return null
  }
  const handleLogout = () => {
    window.localStorage.setItem("loggedBlogappUser", "")
    dispatch(setLogout(null))
  }
  console.log(user)

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <p style={{ display: "inline-block", marginLeft: "10px" }}>
          Logged in as {user.name}
        </p>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu

/*    <div style={{ backgroundColor: "#d3d3d3" }}>
      <div style={{ display: "inline-block" }}>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <p style={{ display: "inline-block", marginLeft: "10px" }}>
        Logged in as {user.name}
        <button
          style={{ marginBottom: "5px", marginLeft: "5px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </p>
    </div> */
