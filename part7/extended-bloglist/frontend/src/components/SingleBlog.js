import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { blogVote, blogRemove } from "../reducers/blogReducer"
import { displayNotification } from "../reducers/notifReducer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { addComment } from "../reducers/blogReducer"
import { Button, TextField } from "@mui/material"
const SingleBlog = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id.toString() === id)
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(blogRemove(blog.id))
      dispatch(displayNotification(`Blog ${blog.title} removed`, 5))
      navigate("/")
    }
  }
  const handleUpdate = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(blogVote(updatedBlog, blog.id))
    dispatch(displayNotification(`you liked ${updatedBlog.title}`, 3))
  }
  console.log(blog)

  const handleComment = (event) => {
    event.preventDefault()
    console.log(comment)
    dispatch(addComment(blog.id, comment))
  }
  const styles = {
    margin: "3px",
  }

  return (
    <div>
      {blog ? (
        <>
          <h2 style={styles}>{blog.title}</h2>
          <p style={styles}>{blog.url}</p>
          <p style={styles}>
            {blog.likes} likes
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleUpdate(blog)}
            >
              like
            </Button>
          </p>
          <p style={styles}>added by {blog.author}</p>
          {user.username === blog.user.username && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleRemove(blog)}
            >
              remove
            </Button>
          )}
          <h3>comments</h3>
          <form onSubmit={handleComment}>
            <TextField
              type="text"
              size="small"
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              add comment
            </Button>
          </form>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))}
          </ul>
        </>
      ) : (
        <h2>No blog found</h2>
      )}
    </div>
  )
}

export default SingleBlog
