import { useEffect, useRef, useState } from "react"
import { getBlogs, getRecommendedBlogs } from "../api/index"
import { Category, BlogCardType, UserType } from "../definitions"
import { useAppSelector } from "../hooks.tsx"
import InfiniteScroll from "react-infinite-scroll-component"

import { useSearchParams } from "react-router-dom"
import BlogCard from "./BlogCard"
import BlogLoader from "./BlogLoader"

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogCardType[]>([])
  const page = useRef(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 10
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")?.toLowerCase() || Category.All

  const {
    loading: userLoading,
    isAuthenticated,
    user,
  } = useAppSelector((state) => state.user)

  const fetchBlogs = async (userId: UserType["userId"] | undefined) => {
    try {
      const response =
        category === Category.All && userId
          ? await getRecommendedBlogs(userId, page.current, limit)
          : await getBlogs(category.toString(), page.current, limit)

      const newBlogs = response.data.blogs
      if (newBlogs.length < limit) {
        setHasMore(false)
      }
      setBlogs((prevBlogs) => Array.from(new Set([...prevBlogs, ...newBlogs])))
      page.current = page.current + 1
    } catch (error: any) {
      console.error(error.response)
      setHasMore(false)
      // Handle error
    }
  }

  useEffect(() => {
    if (userLoading) return
    page.current = 1
    setHasMore(true)
    fetchBlogs(user?.userId)
    setBlogs([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, userLoading, isAuthenticated])

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
        {!hasMore && (
          <div className="text-center text-gray-500 text-xl mt-4 pb-4">
            {blogs.length === 0 ? "No Results Found" : "No More Results"}
          </div>
        )}
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
