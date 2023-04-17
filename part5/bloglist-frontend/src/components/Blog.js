import { useState } from "react"

const Blog = ({ blog, user, handleUpdate, handleRemove }) => {
  const [showInfo, setShowInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const paragraphStyle = {
    marginBottom: 2,
    marginTop: 2,
  }

  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }
  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    handleUpdate(updatedBlog, blog.id)
  }


  return (
    <div className="blog">
      {!showInfo && (
        <div style={blogStyle}>
          <p style={paragraphStyle}>{blog.title} by {blog.author} <button onClick={toggleShowInfo}>View</button></p>
        </div>
      )}
      {showInfo && (
        <div style={blogStyle}>
          <p style={paragraphStyle}>{blog.title} by {blog.author} <button onClick={toggleShowInfo}>Hide</button></p>
          <p style={paragraphStyle}>{blog.url}</p>
          <p style={paragraphStyle}>
            Likes: {blog.likes}{' '}
            <button onClick={handleLike}>Like</button>
          </p>
          <p style={paragraphStyle}>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <button style={{ backgroundColor : "lightblue" }} onClick={() => handleRemove(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog