import React from "react"
import { getUserBlogs, deleteBlog } from "../api"
import { BlogShortType } from "../definitions"
import Loader from "./Loader"
import { NavLink } from "react-router-dom"

const MyBlogs = () => {
  const [page, setPage] = React.useState<number>(1)
  const [totalCount, setTotalCount] = React.useState<number>(0)
  const [blogs, setBlogs] = React.useState<BlogShortType[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)
  const limit = 10

  const totalPages = Math.ceil(totalCount / limit)

  React.useEffect(() => {
    setLoading(true)
    getUserBlogs(page, limit)
      .then((res) => {
        setBlogs(res.data.blogs)
        setTotalCount(res.data.totalCount)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [page])

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleDeleteBlog = (id: BlogShortType["_id"]) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this blog?\nThis Action can be revert back.",
      )
    )
      return
    setDeleteLoading(true)
    deleteBlog(id)
      .then((_res) => {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id))
        setTotalCount((prev) => prev - 1)
      })
      .catch((err) => console.log(err))
      .finally(() => setDeleteLoading(false))
  }

  return (
    <div>
      {/* pagination */}
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        &nbsp; {/* non-breaking space */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            style={{ fontWeight: page === index + 1 ? "bold" : "normal" }}
          >
            {index + 1}&nbsp;
          </button>
        ))}
        <button onClick={nextPage}>Next</button>
      </div>

      {loading ? (
        <Loader />
      ) : blogs.length === 0 ? (
        "No blogs found"
      ) : (
        blogs.map((blog, index) => (
          <div key={blog._id}>
            <NavLink to={`/blog/${blog._id}`}>
              {index + 1}. {blog.title}
            </NavLink>
            <NavLink to={`/write/${blog._id}`}>Edit</NavLink>
            <button
              onClick={() => handleDeleteBlog(blog._id)}
              disabled={deleteLoading}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default MyBlogs
