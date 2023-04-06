import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Addblog from './components/Addblog'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [Message, setMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blog =>
      setBlogs(blog)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      setMessage('error: wrong username or password', true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = (newObject) => {
    setBlogs(blogs.concat(newObject))
    setMessage(`a new blog ${newObject.title} by ${newObject.author} has been added`)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleLogout = () => {
    window.localStorage.setItem(
      'loggedBlogappUser', ""
    ) 
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={Message}/> 
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={Message}/>
        <p>Logged in as {user.name}<button onClick={handleLogout}>Logout</button></p>
        <Addblog handleBlog={handleAddBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App