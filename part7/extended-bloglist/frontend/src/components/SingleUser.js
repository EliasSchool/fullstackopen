import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
const SingleUser = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  if (!users) {
    return null
  }
  const user = users.find((user) => user.id === id)

  return (
    <div>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h3>Added Blogs</h3>
          {user.blogs.length > 0 ? (
            <ul>
              {user.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          ) : (
            <h4>No blogs added</h4>
          )}
        </>
      ) : (
        <h2>No user found</h2>
      )}
    </div>
  )
}

export default SingleUser
