import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const style = {
  marginBottom: "4px", 
  marginTop: "4px"
}

const Addblog = ({ handleBlog}) => {
  const [title, setTitle] = useState("")
  const  [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


  const handleAddBlog = (event) => {
    console.log("Add Blo") 
    event.preventDefault()

    const newObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(newObject) 
      .then(res => {
        handleBlog(res)
      } )
    setAuthor("")
    setTitle("")
    setUrl("")

  }

  return( 
    <>
    <h2>Create new</h2>
    <form onSubmit={handleAddBlog}>
      
      <p style={style}>title:<input type='text'
      value={title}
      onChange={({ target }) => setTitle(target.value)}

      ></input></p>
      <p style={style}>author:<input type='text'
      value={author}
      onChange={({ target }) => setAuthor(target.value)}

      ></input></p>
      <p style={style}>url:<input type='text' 
      value={url}
      onChange={({ target }) => setUrl(target.value)}></input></p>
      <button type='submit'>create </button>
    </form>
    </>
  )
}

export default Addblog