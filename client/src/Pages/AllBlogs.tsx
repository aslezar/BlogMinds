import Blogs from "../components/Blogs"
import Categories from "../components/Categories"
import { useEffect, useState } from "react"
import { TrendingType } from "../definitions"
import { getTrendingBlog } from "../api"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import TrendingSvg from "../assets/img/Feed/TrendingSvg"

const AllBlogs = () => {
  const [trending, setTrending] = useState<TrendingType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    getTrendingBlog()
      .then((res) => setTrending(res.data.blogs))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex gap-3  xl:mx-auto xl:w-5/6 mx-3">
        <div className="w-3/4">
          <div className="sticky top-[4.7rem] bg-white">
            <Categories />
          </div>
          <Blogs />
        </div>
        {trending && (
          <div className="w-[25%]  p-4 border rounded-lg mt-16 h-fit sticky top-20">
            <h2 className="text-lg font-medium mb-5">
              Trending <TrendingSvg />
            </h2>
            {loading ? (
              <Loader />
            ) : (
              trending.map((blog) => (
                <Link to={`/blog/${blog._id}`} key={blog._id}>
                  <div className="flex flex-col gap-1 mb-2 py-2 pb-3 border-t">
                    <p className="font-medium text-gray-700">{blog.title}</p>
                    <div className="text-sm flex items-center gap-5 pr-5 text-gray-600">
                      <span>
                        <Link
                          to={`/user/${blog.author._id}`}
                          className="hover:cursor-pointer hover:underline"
                        >
                          {blog.author.name}
                        </Link>
                      </span>{" "}
                      <span>{blog.totalScore} Interactions</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllBlogs
