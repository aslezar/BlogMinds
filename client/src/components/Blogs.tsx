import { useEffect, useRef, useState } from "react"
import { getBlogs, getRecommendedBlogs } from "../api/index"
import { Category, BlogShortType, UserType } from "../definitions"
import { useAppSelector } from "../hooks.tsx"
import { useSearchParams } from "react-router-dom"
import BlogLoader from "./BlogLoader"

import BlogCard from "./BlogCard"

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogShortType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const limit = 10

  const [searchParams] = useSearchParams()
  const category = searchParams.get("category") || "all"

  const {
    loading: userLoading,
    isAuthenticated,
    user,
  } = useAppSelector((state) => state.user)

  const fetchBlogs = async (userId: UserType["userId"] | undefined) => {
    setLoading(true)
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
      // Handle error
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!containerRef.current) return

    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollHeight - containerRef.current.scrollTop ===
          containerRef.current.clientHeight
      ) {
        fetchBlogs(user?.userId)
      }
    }

    containerRef.current.addEventListener("scroll", handleScroll)
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [fetchBlogs])

  useEffect(() => {
    if (userLoading) return
    fetchBlogs(user?.userId)
    setBlogs([])
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, , userLoading, isAuthenticated])

  return (
    <div
      ref={containerRef}
      style={{ overflowY: "auto", height: "calc(100vh-120px)" }}
      className="contain"
    >
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
      {loading &&
        Array.from({ length: 3 }).map((_, index) => <BlogLoader key={index} />)}
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
  )
}

export default Blogs
