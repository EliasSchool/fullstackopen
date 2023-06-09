import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    initBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      return [...state, action.payload]
    },
    voteBlog: (state, action) => {
      const updatedBlogs = state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog
      )
      return updatedBlogs
    },
    removeBlog: (state, action) => {
      console.log(action.payload)
      return state.filter((blog) => blog.id !== action.payload)
    },
    commentAdd: (state, action) => {
      const { blogId, comment } = action.payload
      const updatedBlogs = state.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              comments: [
                ...blog.comments,
                {
                  comment: comment.comment,
                  id: comment.id,
                },
              ],
            }
          : blog
      )
      console.log(updatedBlogs)
      return updatedBlogs
    },
  },
})

export const { initBlogs, addBlog, voteBlog, removeBlog, commentAdd } =
  blogSlice.actions

export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(initBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch(addBlog(blog))
  }
}

export const blogVote = (content, id) => {
  return async (dispatch) => {
    await blogService.update(id, content)
    dispatch(voteBlog(content))
  }
}

export const blogRemove = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.comment(id, comment)
    console.log(newComment)
    dispatch(
      commentAdd({
        blogId: id,
        comment: newComment,
      })
    )
  }
}
