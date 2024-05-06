import { useEffect, useState } from "react"
import { getUserBlogs } from "../api"
import { BlogShortType } from "../definitions"
import { Link } from "react-router-dom"
import Pagination from "@mui/material/Pagination"

const MyBlogs = () => {
  const [page, setPage] = useState<number>(1)
  const [blogs, setBlogs] = useState<BlogShortType[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const limit = 6

  useEffect(() => {
    getUserBlogs(page, limit)
      .then((res) => {
        setBlogs(res.data.blogs)
        setTotalCount(res.data.totalCount)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }, [page])

  return (
    <div className="w-11/12 mx-auto flex flex-col justify-between h-[78vh]">
      {blogs.length === 0 && (
        <h1 className="text-3xl font-medium ">No blogs found</h1>
      )}
      {!!blogs.length && (
        <ul className="list-none grid grid-cols-3 gap-7">
          {blogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              className="max-w-sm mx-auto flex flex-col gap-2 border-b py-4"
            >
              <h1 className="text-2xl font-bold text-gray-600 line-clamp-1">
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
              <div className="flex gap-2 items-center flex-wrap">
                {blog.tags.map((tag) => (
                  <span className="text-gray-600 bg-gray-200 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
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
