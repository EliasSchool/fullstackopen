import React from "react"
import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { displayNotification } from "../reducers/notifReducer"
import { TextField, Button } from "@mui/material"

import Togglable from "./Togglable"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(
      displayNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} has been added`,
        5
      )
    )

    setAuthor("")
    setTitle("")
    setUrl("")
  }
  return (
    <>
      <h2>Create new blog</h2>
      <Togglable buttonLabel="create" ref={blogFormRef}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="title"
              size="small"
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></TextField>
          </div>
          <div>
            <TextField
              label="author"
              size="small"
              type="text"
              id="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            ></TextField>
          </div>
          <div>
            <TextField
              label="url"
              size="small"
              type="text"
              id="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            ></TextField>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            create
          </Button>
        </form>
      </Togglable>
    </>
  )
}

export default BlogForm
