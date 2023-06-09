import React from "react"
import { displayNotification } from "../reducers/notifReducer"
import { useState } from "react"
import loginService from "../services/login"
import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { TextField, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      dispatch(setUser(user))
      navigate("/blogs")
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(displayNotification("error: wrong username or password", 5))
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id="username"
            type="text"
            value={username}
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            name="Password"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
