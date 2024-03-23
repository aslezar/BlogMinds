import { useEffect, useRef, useState } from "react"
import { getBlogs, getRecommendedBlogs } from "../api/index"
import { Category, BlogShortType, UserType } from "../definitions"
import { useAppSelector } from "../hooks.tsx"
import InfiniteScroll from "react-infinite-scroll-component"

import { useSearchParams } from "react-router-dom"
import BlogCard from "./BlogCard"
import ImagePlaceholder from "../assets/img/Feed/ImagePlaceholder.tsx"

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogShortType[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 10
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category") || "all"

  const {
    loading: userLoading,
    isAuthenticated,
    user,
  } = useAppSelector((state) => state.user)

  const fetchBlogs = async (userId: UserType["userId"] | undefined) => {
    try {
      const response =
        category === Category.All && userId
          ? await getRecommendedBlogs(userId, page, limit)
          : await getBlogs(category.toString(), page, limit)

      const newBlogs = response.data.blogs
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs])
      setPage((prevPage) => prevPage + 1)
    } catch (error: any) {
      console.error(error.response)
      setHasMore(false)
      // Handle error
    }
  }

  useEffect(() => {
    if (userLoading) return
    fetchBlogs(user?.userId)
    setBlogs([])
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, , userLoading, isAuthenticated])

  return (
    <>
      <div id="scrollableDiv">
        <InfiniteScroll
          dataLength={blogs.length}
          next={() => fetchBlogs(user?.userId)}
          hasMore={hasMore}
          loader={
            <div
              role="status"
              className=" pr-5 my-6 mr-8 animate-pulse md:space-y-0  rtl:space-x-reverse md:flex flex-row-reverse md:items-center justify-between"
            >
              <div className="flex items-center justify-center w-full h-40 mt-4 bg-gray-300 rounded-md sm:w-96 ">
                <ImagePlaceholder />
              </div>
              <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5 w-4/5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </InfiniteScroll>
        <style>
          {`
      .contain {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
      }
      .contain::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
      }`}
        </style>
      </div>
    </>
  )
}

export default Blogs
