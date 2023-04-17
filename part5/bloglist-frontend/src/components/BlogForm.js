import React from 'react'
import { useState } from 'react'

const style = {
  marginBottom: "4px",
  marginTop: "4px"
}

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const  [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    createBlog(blogObject)

    setAuthor("")
    setTitle("")
    setUrl("")
  }
  return(
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>

        <p style={style}>title:<input type='text'
          id='title'
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder='title of the blog'

        ></input></p>
        <p style={style}>author:<input type='text'
          id='author'
          value={author}
          onChange={event => setAuthor(event.target.value)}
          placeholder='author of the blog'

        ></input></p>
        <p style={style}>url:<input type='text'
          id='url'
          value={url}
          onChange={event => setUrl(event.target.value)}
          placeholder='url of the blog'

        ></input></p>
        <button id='create-button' type='submit'>create </button>
      </form>
    </>
  )
}

export default BlogForm