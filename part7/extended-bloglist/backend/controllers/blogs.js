const jwt = require("jsonwebtoken")
const { findById } = require("../models/blog")
const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comments")
const middleware = require("../utils/middleware")
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { comment: 1, id: 1 })
  console.log(blogs)
  response.json(blogs)
})

blogRouter.get("/:id", async (request, response) => {
  const blogs = await Blog.findById(request.params.id)
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }

  const user = await User.findById(request.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  console.log(blog, "newblog")
  const savedBlog = await blog.save()
  console.log(savedBlog, "savedblog")
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.post("/:id/comments", async (request, response) => {
  const blogId = request.params.id
  const commentText = request.body.comment

  const blog = await Blog.findById(blogId)
  console.log(blog)
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" })
  }

  const newComment = {
    comment: commentText,
    blog: blog._id,
  }

  const comment = new Comment(newComment)
  await comment.save()

  if (!blog.comments) {
    blog.comments = []
  }
  const { execPopulate } = require("mongoose")

  // Add the comment to the blog's comments array
  blog.comments.push(comment._id)
  await blog.save()

  response.status(201).json({ id: comment._id, comment: comment.comment })
})

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = await User.findById(request.user)
    const blogToDelete = await Blog.findById(request.params.id)

    if (!user.id || !blogToDelete.user.toString() === user.id.toString()) {
      return response
        .status(401)
        .json({ error: "token invalid or user unauthorized" })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
)

blogRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    _id: request.params.id,
  })
  const blogupdated = await Blog.findByIdAndUpdate(request.params.id, blog)

  response.status(201).json(blogupdated)
})

module.exports = blogRouter
