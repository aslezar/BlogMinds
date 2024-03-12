import { useEffect, useState } from "react"
import { getBlogs } from "../api/index"
import { Category, BlogShortType } from "../definitions"

import BlogCard from "./BlogCard"
import Loader from "./Loader"

interface BlogsProps {
  category: Category
}

const Blogs = ({ category }: BlogsProps) => {
  const [blogs, setBlogs] = useState<BlogShortType[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchBlog = () => {
      setLoading(true)
      getBlogs(category.toString(), page, limit)
        .then((response) => {
          const { data } = response
          // console.log(data)
          setBlogs(data)
        })
        .catch((error) => {
          console.error(error.response)
          setBlogs([])
          setError(error.response.data?.msg)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchBlog()
  }, [category, page, limit])
  return (
    <>
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <div>{error}</div>}
    </>
  )
}

export default Blogs
