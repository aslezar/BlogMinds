import React, { useEffect } from "react"
import { getBlog } from "../api/index.ts"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { BlogFullType } from "../definitions"

const BlogPage = () => {
  const [isError, setError] = React.useState<boolean>(false)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [blog, setBlog] = React.useState<BlogFullType | null>(null)
  const [likeCount, setLikeCount] = React.useState<number>(0)
  const [isLiked, setIsLiked] = React.useState<boolean>(false)
  const [comments, setComments] = React.useState<
    { author: string; text: string }[]
  >([])
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          setError(true)
          return toast.error("Blog not found")
        }

        setLoading(true)
        const { data } = await getBlog(id)
        setBlog(data.blog)
        setComments(data.blog.comments)
        setLikeCount(data.blog.likes)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchBlog()
  }, [])

  const handleLike = () => {
    setIsLiked(true)
    setLikeCount(likeCount + 1)
  }

  const handleUnlike = () => {
    setIsLiked(false)
    setLikeCount(likeCount - 1)
  }

  if (isLoading === true || !blog) return <Loader />
  if (isError === true) return <div>Error</div>

  return (
    <div className="mx-auto pt-20 pb-5 lg:pt-0 min-h-[75vh] bg-white flex flex-col justify-between">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto shadow-sm px-5">
        <Link
          to={"/allarticles"}
          className="mt-3 flex items-center gap-1 text-lg text-teal-800  pr-3  "
        >
          <span>All Articles </span>
        </Link>
        <h2 className="text-3xl md:text-5xl w-full font-semibold  text-zinc-800">
          {blog?.title}
        </h2>
        <div>
          <p className="font-[450] text-gray-600 text-xl  mb-3">
            {blog?.description}
          </p>
          <div className="border-b-2 pb-4 text-gray-500 font-sans">
            {blog?.createdAt &&
              new Date(blog.createdAt).toISOString().split("T")[0]}
          </div>
        </div>

        <figure className="">
          <img
            src={blog?.img}
            alt="img"
            className=" object-cover w-full max-h-96"
          />
        </figure>
        <div className="text-gray-500 mt-2">
          {blog?.content && (
            <>
              <p>{blog.content}</p>
              Character Length: {blog.content.length}
              <br />
              Estimated Read Time:{" "}
              {Math.ceil(blog.content.split(" ").length / 200)} minutes
            </>
          )}
        </div>
        <div className="flex items-center mt-4">
          <button
            className={`mr-2 px-4 py-2 rounded-md bg-teal-500 text-white focus:outline-none ${
              isLiked && "bg-teal-700"
            }`}
            onClick={handleLike}
            disabled={isLiked}
          >
            Like
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white focus:outline-none"
            onClick={handleUnlike}
            disabled={!isLiked}
          >
            Unlike
          </button>
          <span className="ml-2">{likeCount} Likes</span>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {comments && comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mb-4">
                  <p className="font-semibold">{comment.author}</p>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
