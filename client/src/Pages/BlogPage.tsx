import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getBlog } from "../api/index.ts"
import Loader from "../components/Loader"
import toast from "react-hot-toast"

import { BlogFullType } from "../definitions"

const BlogPage = () => {
  const [isError, setError] = React.useState<boolean>(false)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [blog, setBlog] = React.useState<BlogFullType | null>(null)
  const { id } = useParams<{ id: BlogFullType["_id"] }>()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          setError(true)
          return toast.error("Blog not found")
        }

        setLoading(true)
        const response = await getBlog(id)
        // console.log(response.data)
        setBlog(response.data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchBlog()
  }, [])

  if (isLoading === true) return <Loader />
  if (isError === true) return <div>Error</div>

  return <div>{JSON.stringify(blog)}</div>
}

export default BlogPage
