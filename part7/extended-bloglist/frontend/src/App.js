import { useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import { useDispatch } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import { setUsers } from "./reducers/usersReducer"
import Users from "./components/Users"
import LoginForm from "./components/Loginform"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PageLayout from "./components/Pagelayout"
import SingleUser from "./components/SingleUser"
import SingleBlog from "./components/SingleBlog"
import { Container } from "@mui/material"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      console.log("asdas")
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <Container maxWidth={"100%"}>
      <div>
        <Router>
          <PageLayout />
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />

            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<SingleUser />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </div>
    </Container>
  )
}

export default App
