import Blogs from "../components/Blogs"
import Categories from "../components/Categories"
import { useEffect, useState } from "react"
import { Category, TrendingType } from "../definitions"
import { getTrendingBlog } from "../api"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
const AllBlogs = () => {
  const [category, setCategory] = useState<Category>(Category.All)
  const [trending, setTrending] = useState<TrendingType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    getTrendingBlog()
      .then((res) => setTrending(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex gap-3  mx-auto w-5/6">
        <div className=" w-3/4  ">
          <Categories category={category} setCategory={setCategory} />
          <Blogs category={category} />
        </div>
        {trending && (
          <div className="w-[25%]  p-4 border rounded-lg mt-16 h-fit">
            <h2 className="text-lg font-medium mb-5">
              Trending{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 inline mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
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
