import React from "react"
import { getUserBlogs } from "../api"
import { BlogShortType } from "../definitions"

const MyBlogs = () => {
  const [page, setPage] = React.useState<number>(1)
  const [blogs, setBlogs] = React.useState<BlogShortType[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const limit = 10

  React.useEffect(() => {
    setLoading(true)
    getUserBlogs(page, limit)
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [page])

  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div>
      {/* pagination */}
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        &nbsp; {/* non-breaking space */}
        {page}
        &nbsp; {/* non-breaking space */}
        <button onClick={nextPage}>Next</button>
      </div>

      {loading
        ? "Loading..."
        : blogs.length === 0
          ? "No blogs found"
          : blogs.map((blog,index) => <div key={blog._id}>{index}. {blog.title}</div>)}
    </div>
  )
}

export default MyBlogs
