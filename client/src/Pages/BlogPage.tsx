import React, { useEffect } from "react"
import { getBlog, likeBlog } from "../api/index.ts"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { BlogFullType, UserType } from "../definitions"
import { useAppSelector } from "../hooks.tsx"
import { format } from "date-fns/format" // Import date-fns under a namespace
// import { useNavigate } from "react-router-dom"
import { IoBookOutline } from "react-icons/io5"

type BlogPageProps = {
  isEmbed?: boolean
}

const BlogPage = ({ isEmbed }: BlogPageProps) => {
  const [isError, setError] = React.useState<boolean>(false)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [blog, setBlog] = React.useState<BlogFullType | null>(null)
  const [isLiked, setIsLiked] = React.useState<boolean>(false)
  // const [likeLoading, setLikeLoading] = React.useState<boolean>(false)

  const { id } = useParams<{ id: string }>()
  // const navigate = useNavigate()
  const { loading, isAuthenticated, user } = useAppSelector(
    (state) => state.user,
  )
  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy")
  }

  useEffect(() => {
    const fetchBlog = async (userId: UserType["userId"] | null) => {
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
  console.log(blog)

  const handleLikeButton = () => {
    if (!isAuthenticated)
      return toast.error("Please login to like the blog", {
        id: "Please login to like the blog",
      })
    if (!id) return toast.error("No such blog")
    setIsLiked((prev) => !prev)
    likeBlog(id)
      .then(() => {
        setBlog((prev) => {
          return prev
            ? { ...prev, likesCount: prev.likesCount + (isLiked ? -1 : 1) }
            : prev
        })
      })
      .catch((error) => {
        toast.error("There was an error, please try again later")
        console.log(error)
      })
  }

  if (isLoading === true) return <Loader />
  if (isError === true || !blog) return <div>Error</div>

  return (
    <div
      className={`mx-auto ${isEmbed ? "" : "pt-20"} pb-5 lg:pt-0 min-h-[75vh] bg-white flex flex-col justify-between`}
    >
      <div className="flex flex-col gap-4 max-w-4xl mx-auto shadow-sm px-5">
        <Link
          to={"/feed"}
          className="mt-3 flex items-center gap-1 text-lg text-teal-800  pr-3  "
        >
          <span>All Articles </span>
        </Link>
        <h2 className="text-5xl md:text-5xl w-full font-semibold text-zinc-800 font-playfair">
          {blog?.title}
        </h2>
        <div>
          <p className="font-[450] text-gray-600 text-2xl mb-3 font-[inter]">
            {blog?.description}
          </p>

          <div className="flex gap-3 items-end text-lg">
            {/* {blog.author && (
              <div className="flex items-end ">
                <img
                  className="object-cover object-center w-6 aspect-square rounded-full"
                  src={blog.author.profileImage}
                  alt=""
                />

                <div className="ml-2">
                  <h1
                    className="text-[15px] text-gray-700 hover:underline hover:cursor-pointer"
                    onClick={() => {
                      navigate(`/user/${blog.author._id}`)
                    }}
                  >
                    {blog.author.name}
                  </h1>
                </div>
              </div>
            )} */}
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              {blog.createdAt && (
                <p className="text-center text-gray-600 ">
                  {formatDate(blog.createdAt)}
                </p>
              )}
            </div>
            <span className="text-2xl text-gray-600 font-thin">|</span>
            <div className="flex items-center gap-1">
              <IoBookOutline className="font-thin w-5 h-5" />
              <span className="text-center text-gray-600">
                {Math.ceil(blog.content.split(" ").length / 200)}m readtime
              </span>
            </div>
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
        <div className="text-gray-500 mt-2 ">
          {blog?.content && (
            <>
              <pre className="w-[100%] whitespace-pre-line text-xl font-[inter] leading-8">
                {blog.content}
              </pre>
              Character Length: {blog.content.length}
              <br />
            </>
          )}
        </div>
        <div className="flex items-center mt-4">
          <div className="heart-bg">
            <div
              className={`heart-icon ${isLiked ? "liked" : ""}`}
              onClick={handleLikeButton}
            ></div>
          </div>
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
