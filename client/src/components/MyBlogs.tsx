import React from "react"
import { useEffect, useState } from "react"
import { getUserBlogs, deleteBlog } from "../api"
import { BlogShortType } from "../definitions"
import Pagination from "@mui/material/Pagination"
import Loader from "./Loader"
import { BsTrash } from "react-icons/bs"
import { Link } from "react-router-dom"

const MyBlogs = () => {
  const [page, setPage] = useState<number>(1)
  const [blogs, setBlogs] = useState<BlogShortType[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  const limit = 6

  const handleDeleteBlog = (id: BlogShortType["_id"]) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this blog?\nThis Action can revert back.",
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

  useEffect(() => {
    setLoading(true)
    getUserBlogs(page, limit)
      .then((res) => {
        setBlogs(res.data.blogs)
        setTotalCount(res.data.totalCount)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  return (
    <div className="w-11/12 mx-auto flex flex-col justify-between h-[78vh]">
      {blogs.length === 0 && !loading && (
        <h1 className="text-3xl font-medium ">No blogs found</h1>
      )}
      {!blogs && loading && <Loader />}
      {!!blogs.length && (
        <ul className="list-none grid grid-cols-3 gap-7">
          {blogs.map((blog) => (
            <div className="max-w-sm mx-auto flex flex-col gap-2 py-4 border-b">
              <Link
                to={`/blog/${blog._id}`}
                className="flex flex-col gap-2 py-2"
              >
                <h1
                  className="text-2xl font-bold text-gray-600 line-clamp-1 hover:underline"
                >
                  {blog.title}
                </h1>
                <p className="width-auto  text-gray-600 flex-shrink line-clamp-2 h-14">
                  {blog.description}
                </p>
                <img
                  src={
                    blog.img ||
                    "https://i0.wp.com/www.bishoprook.com/wp-content/uploads/2021/05/placeholder-image-gray-16x9-1.png?ssl=1"
                  }
                  alt="img"
                  className="aspect-video rounded-md "
                  loading="lazy"
                />
                {/* render blogs.myInterests.map in a flex div */}
                <div className="flex gap-2 items-center flex-wrap min-h-12">
                  {blog.tags.map((tag) => (
                    <span className="text-gray-600 bg-gray-200 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
              <button
                title="Delete blog"
                onClick={() => handleDeleteBlog(blog._id)}
                disabled={deleteLoading}
                type="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-fit ml-auto duration-150"
              >
                <BsTrash className="text-base" />
              </button>
            </div>
          ))}
        </ul>
      )}

      {/* pagination */}
      <footer>
        <Pagination
          className="!my-6 !ml-auto !w-fit !mr-6"
          count={Math.ceil(totalCount / limit)}
          color="secondary"
          shape="rounded"
          onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value)
          }}
        />
      </footer>
    </div>
  )
}

export default MyBlogs
