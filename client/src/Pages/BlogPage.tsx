import React, { useEffect, useRef } from "react"
import { commentBlog, getBlog, likeBlog } from "../api/index.ts"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { BlogFullType, UserType } from "../definitions"
import { useAppSelector } from "../hooks.tsx"
import { format } from "date-fns/format" // Import date-fns under a namespace
import { IoBookOutline } from "react-icons/io5"
import { useEditorContext } from "../context/EditorContext"
import { NavLink } from "react-router-dom"

type BlogPageProps = {
  isEmbed?: boolean
}

const BlogPage = ({ isEmbed }: BlogPageProps) => {
  const [isError, setError] = React.useState<boolean>(false)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [blog, setBlog] = React.useState<BlogFullType>()
  const [isLiked, setIsLiked] = React.useState<boolean>(false)
  const [comment, setComment] = React.useState<string>("")
  const { initializeEditor, editor } = useEditorContext()
  const { id } = useParams<{ id: string }>()
  const editorRef = useRef<any>(null)
  console.log(blog)
  // pass blog content to editor
  useEffect(() => {
    if (blog?.content) {
      if (editorRef.current === null) {
        initializeEditor(true, JSON.parse(blog.content))
        editorRef.current = true
        // editor?.render({blocks: JSON.parse(blog.content)})
      }
    }
  }, [blog?.content, editor, initializeEditor])

  // useEffect(() => {
  //   if (blog?.content && editor) {
  //     editor?.render({ blocks: JSON.parse(blog?.content) })
  //   }
  // }, [blog?.content])

  const { loading, isAuthenticated, user } = useAppSelector(
    (state) => state.user,
  )
  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy")
  }
  const postComment = async () => {
    if (!isAuthenticated) return toast.error("Please login to post a comment")
    if (comment === "") return toast.error("Please write a comment")
    if (!id) return toast.error("No such blog")
    if (!user) return toast.error("Please login to post a comment")
    commentBlog(id, comment)
      .then((res) => {
        const comment = res.data.comment

        const newComment: BlogFullType["comments"][0] = {
          _id: comment._id,
          message: comment.message,
          createdAt: comment.createdAt,
          author: {
            _id: user.userId,
            name: user.name,
            profileImage: user.profileImage,
          },
        }

        setBlog((prevBlog) =>
          prevBlog
            ? { ...prevBlog, comments: [newComment, ...prevBlog.comments] }
            : prevBlog,
        )

        setComment("")
      })
      .catch((error) => {
        toast.error("There was an error, please try again later")
        console.log(error)
      })
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
      <div className="flex flex-col gap-4 max-w-6xl mx-auto shadow-sm space-y-4 p-5 font-inter">
        <figure>
          <img
            src={blog?.img}
            alt={blog?.title}
            className=" object-cover w-full aspect-[2]"
          />
        </figure>
        <h2 className="text-5xl md:text-5xl w-full font-bold text-dark  text-center">
          {blog?.title}
        </h2>
        <div>
          <p className="font-[400] text-center text-gray-600 text-[1.4rem] mb-7 ">
            {blog?.description}
          </p>
          {/* blog tags */}
          
          <div className="flex gap-3 items-center text-lg justify-center">
            <div className="flex items-center ">
              <div className="heart-bg">
                <div
                  className={`heart-icon ${isLiked ? "liked" : ""}`}
                  onClick={handleLikeButton}
                ></div>
              </div>
              <span className=" ">{blog.likesCount} Likes</span>
            </div>
            <span className="text-2xl text-gray-600 font-thin">|</span>
            {blog.author && (
              <NavLink
                className="flex items-end "
                to={`/user/${blog.author._id}`}
              >
                <img
                  className="object-cover object-center w-7 aspect-square rounded-full"
                  src={blog.author.profileImage}
                  alt=""
                />

                <div className="ml-2">
                  <h1 className="text-lg text-gray-700 hover:underline hover:cursor-pointer">
                    {blog.author.name}
                  </h1>
                </div>
              </NavLink>
            )}

            {blog.author && (
              <span className="text-2xl text-</svg>gray-600 font-thin">|</span>
            )}
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
            <div className="flex items-center gap-2 text-base  text-white bg-highlight rounded-full px-2.5  py-1">
              <IoBookOutline className="mt-0.5" />
              <span className="text-center ">
                {Math.ceil(blog.content.split(" ").length / 200)}m read time
              </span>
            </div>
            {user?.userId === blog.author._id && (
              <>
                <span className="text-2xl text-gray-600 font-thin">|</span>
                <NavLink
                  to={`/write/${id}`}
                  className="bg-dark px-4 hover:bg-highlight transition-all py-1 rounded-full duration-200 text-white font-medium"
                >
                  Edit
                </NavLink>
              </>
            )}
          </div>
        <div className="flex gap-2 mt-5 justify-center">
            {blog?.tags.map((tag, index) => (
              <span
                key={index}
                className="text-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div id="editorjs" className="text-gray-700 mx-auto"></div>
        <div className="py-10 w-5/6 mx-auto">
          <h3 className="text-2xl font-semibold mb-5">Comments</h3>
          <form
            className="flex gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              postComment()
            }}
          >
            <input
              type="text"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              disabled={comment === ""}
              className="bg-highlight text-white px-4 py-2 rounded-full"
            >
              Post
            </button>
          </form>
          {blog?.comments && blog?.comments?.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul className="space-y-7">
              {/* input field to write comment with post button */}

              {blog?.comments?.map((comment, index) => (
                <li
                  key={index}
                  className="mb-4 gap-4 flex items-center text-lg"
                >
                  <NavLink to={`/user/${comment.author._id}`}>
                    <img
                      className="object-cover w-12 rounded-full aspect-square"
                      src={comment?.author?.profileImage}
                      alt={"img"}
                    />
                  </NavLink>
                  <div>
                    <NavLink to={`/user/${comment.author._id}`}>
                      <p className="font-medium hover:underline hover:cursor-pointer">
                        {comment.author.name}
                      </p>
                    </NavLink>
                    <p>{comment?.message}</p>
                    <p className="text-gray-500 text-sm">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style>{`
        .ce-block__content{
          max-width: 1000px !important;
          font-size: 1.1rem;
          padding: 0 1rem;
        }
      `}</style>
    </div>
  )
}

export default BlogPage
