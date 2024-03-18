import React, { useEffect } from "react"
import { getBlog, likeBlog } from "../api/index.ts"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { BlogFullType } from "../definitions"
import { useAppSelector } from "../hooks.tsx"

const BlogPage = () => {
  const [isError, setError] = React.useState<boolean>(false)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [blog, setBlog] = React.useState<BlogFullType | null>(null)
  const [isLiked, setIsLiked] = React.useState<boolean>(false)
  const [likeLoading, setLikeLoading] = React.useState<boolean>(false)

  const { id } = useParams<{ id: string }>()
  const { loading, isAuthenticated, user } = useAppSelector(
    (state) => state.user,
  )

  useEffect(() => {
    const fetchBlog = async (userId: BlogFullType["_id"] | null) => {
      if (!id) {
        setError(true)
        return toast.error("No such blog")
      }
      try {
        const { data } = await getBlog(id, userId)
        const { blog, isLiked: liked } = data

        setBlog(blog)
        setIsLiked(liked)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    const userId = user && user.userId
    if (!loading) fetchBlog(userId)
  }, [loading, isAuthenticated, user])

  const handleLikeButton = () => {
    if (!isAuthenticated)
      return toast.error("Please login to like the blog", {
        id: "Please login to like the blog",
      })
    if (!id) return toast.error("No such blog")
    setLikeLoading(true)
    likeBlog(id)
      .then(() => {
        setIsLiked((prev) => !prev)
        setBlog((prev) => {
          return prev
            ? { ...prev, likesCount: prev.likesCount + (isLiked ? -1 : 1) }
            : prev
        })
      })
      .finally(() => {
        setLikeLoading(false)
      })
  }

  if (isLoading === true) return <Loader />
  if (isError === true || !blog) return <div>Error</div>

  return (
    <div className="mx-auto pt-20 pb-5 lg:pt-0 min-h-[75vh] bg-white flex flex-col justify-between">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto shadow-sm px-5">
        <Link
          to={"/feed"}
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
            width={500}
            height={300}
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
            className={`mr-2 px-4 py-2 rounded-md ${isLiked ? "bg-red-500" : "bg-teal-500"} text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleLikeButton}
            disabled={likeLoading}
          >
            {likeLoading ? <Loader /> : isLiked === true ? "Liked" : "Like"}
          </button>
          <span className="ml-2">{blog.likesCount} Likes</span>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {blog.comments && blog.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {blog.comments.map((comment, index) => (
                <li key={index} className="mb-4">
                  <img
                    className="object-cover w-full mx-auto lg:mx-0 lg:w-52 aspect-video rounded-xl mb-2"
                    src={comment.author.profileImage}
                    alt={"img"}
                  />
                  <p className="font-semibold">{comment.author.name}</p>
                  <p>{comment.message}</p>
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
