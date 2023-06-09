import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Blog from "./Blog"
import BlogForm from "./BlogForm"

describe("Blog tests", () => {
  test("renders a blog", () => {
    const blog = {
      title: "title is being rendered correctly",
      author: "shakespeare",
      url: "http://localhost:",
    }
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent("title is being rendered correct")
    expect(div).toHaveTextContent("shakespeare")
    expect(div).not.toHaveTextContent("http://localhost:")
  })
  test("shows all blog information when clicked", async () => {
    const blog = {
      title: "title is being rendered correctly",
      author: "shakespeare",
      url: "http://localhost:",
      likes: 100,
      user: {
        username: "username",
        name: "Simo",
      },
    }
    const username = {
      username: "nobody",
    }

    const { container } = render(<Blog blog={blog} user={username} />)

    const user = userEvent.setup()
    const button = screen.getByText("View")
    await user.click(button)
    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent("title is being rendered correct")
    expect(div).toHaveTextContent("shakespeare")
    expect(div).toHaveTextContent("http://localhost:")
    expect(div).toHaveTextContent("100")
  })

  test("like button is being clicked twice", async () => {
    const blog = {
      title: "title is being rendered correctly",
      author: "shakespeare",
      url: "http://localhost:",
      likes: 100,
      user: {
        username: "username",
        name: "Simo",
      },
    }
    const username = {
      username: "nobody",
    }

    const mockHandler = jest.fn()
    render(<Blog blog={blog} user={username} handleUpdate={mockHandler} />)
    const user = userEvent.setup()
    const viewbutton = screen.getByText("View")
    await user.click(viewbutton)

    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test("testing the new blog form", async () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)
    const createButton = screen.getByText("create")
    const title = screen.getByPlaceholderText("title of the blog")
    const author = screen.getByPlaceholderText("author of the blog")
    const url = screen.getByPlaceholderText("url of the blog")

    await userEvent.type(title, "testing the title")
    await userEvent.type(author, "author testing")
    await userEvent.type(url, "is the url included")
    await userEvent.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("testing the title")
    expect(createBlog.mock.calls[0][0].author).toBe("author testing")
    expect(createBlog.mock.calls[0][0].url).toBe("is the url included")
  })
})
