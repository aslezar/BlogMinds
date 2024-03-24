import { useEffect, useState } from "react"
import { getBlogs, getRecommendedBlogs } from "../api/index"
import { Category, BlogShortType, UserType } from "../definitions"
import { useAppSelector } from "../hooks.tsx"
import InfiniteScroll from "react-infinite-scroll-component"

import { useSearchParams } from "react-router-dom"
import BlogCard from "./BlogCard"
import BlogLoader from "./BlogLoader"

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
          loader={Array.from({ length: 3 }).map((_, index) => (
            <BlogLoader key={index} />
          ))}
        >
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
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
