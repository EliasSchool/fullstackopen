import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
const App = () => {
  const [blogs, setBlogs] = useState([])

  const [Message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [updateBlog, setBlogupdate] = useState(0)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blog) => {
      blog.sort((a, b) => b.likes - a.likes)
      setBlogs(blog)
    })
  }, [updateBlog])


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
      }, 4000)
    }
  }
  const handleLogout = () => {
    window.localStorage.setItem(
      'loggedBlogappUser', ""
    )
    setUser(null)
  }

  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log(returnedBlog)
      })
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} has been added`)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleUpdate = async (updatedBlog, id) => {
    await blogService.update(id, updatedBlog)
    console.log(updateBlog)
    setBlogupdate(updateBlog + 1)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={Message}/>
      {!user && <LoginForm
        handleSubmit={handleLogin}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        password={password}
        username={username}
      />}
      {user && <div>
        <p>Logged in as {user.name}<button onClick={handleLogout}>Logout</button></p>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={handleAddBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleUpdate={handleUpdate} handleRemove={handleRemove}/>
        )}
      </div>
      }
    </div>
  )
}

export default App