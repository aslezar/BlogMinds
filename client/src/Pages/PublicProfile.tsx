import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getOtherUserBlogs, getUserProfile } from "../api"
import { Profile, ProfileBlogs } from "../definitions"
import { format } from "date-fns/format"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import Pagination from "@mui/material/Pagination"

const PublicProfile = () => {
  const userId = useParams().id
  const [user, setUser] = useState<Profile | null>(null)
  const [blogs, setBlogs] = useState<ProfileBlogs[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)

  const limit = 6

  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy")
  }
  useEffect(() => {
    if (!userId) return
    setLoading(true)
    getUserProfile(userId, page, limit)
      .then((response) => {
        setUser(response.data.user)
      })
      .catch((error) => console.log("Error fetching user profile", error))
      .finally(() => setLoading(false))
  }, [userId, page])
  useEffect(() => {
    if (!userId) return
    getOtherUserBlogs(userId, page, limit).then((response) => {
      setBlogs(response.data.blogs)
      setTotalCount(response.data.totalCount)
      console.log(response.data)
    })
    .catch((error) => console.log("Error fetching user blogs", error))
  },[page])

  if (loading) return <Loader />
  return (
    <div>
      <main className=" w-4/5 mx-auto border-[1.5px] mt-3 rounded-xl p-4">
        <section className="">
          <div>
            <div className="p-4 flex">
              <div className="relative flex mr-5">
                <div className="flex flex-1">
                  <div>
                    <div
                      style={{ height: "9rem", width: "9rem" }}
                      className="md rounded-full relative avatar"
                    >
                      <img
                        className="rounded-full"
                        src={user?.profileImage}
                        alt="profile"
                        loading="lazy"
                      />
                      <div className="absolute"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 justify-center w-full mt-3 ml-3">
                <div>
                  <h2 className="text-xl leading-6 font-bold text-gray-600">
                    {user?.name}
                  </h2>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 leading-tight mb-2">
                    {user?.bio}
                  </p>
                  <div className="text-gray-600 flex">
                    <span className="flex mr-2">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon">
                        <g>
                          <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                          <circle cx="7.032" cy="8.75" r="1.285"></circle>
                          <circle cx="7.032" cy="13.156" r="1.285"></circle>
                          <circle cx="16.968" cy="8.75" r="1.285"></circle>
                          <circle cx="16.968" cy="13.156" r="1.285"></circle>
                          <circle cx="12" cy="8.75" r="1.285"></circle>
                          <circle cx="12" cy="13.156" r="1.285"></circle>
                          <circle cx="7.032" cy="17.486" r="1.285"></circle>
                          <circle cx="12" cy="17.486" r="1.285"></circle>
                        </g>
                      </svg>
                      <span className="leading-5 ml-1">
                        Joined {user?.createdAt && formatDate(user.createdAt)}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                  <div className="text-center pr-3">
                    <span className="font-bold text-gray-600">
                      {user?.followingCount}
                    </span>
                    <span className="text-gray-600"> Following</span>
                  </div>
                  <div className="text-center px-3">
                    <span className="font-bold text-gray-600">
                      {user?.followersCount}{" "}
                    </span>
                    <span className="text-gray-600"> Followers</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-dark text-white px-4 py-1 rounded-lg mt-3 hover:bg-highlight"
                    onClick={() => {
                      toast.success("This feature is not available yet")
                    }}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-none grid grid-cols-3 gap-7  p-6">
            {blogs?.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="max-w-sm mx-auto flex flex-col gap-2 border-b py-4"
              >
                <span className="flex gap-1 items-center text-gray-600">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 paint-icon ">
                    <g>
                      <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                      <circle cx="7.032" cy="8.75" r="1.285"></circle>
                      <circle cx="7.032" cy="13.156" r="1.285"></circle>
                      <circle cx="16.968" cy="8.75" r="1.285"></circle>
                      <circle cx="16.968" cy="13.156" r="1.285"></circle>
                      <circle cx="12" cy="8.75" r="1.285"></circle>
                      <circle cx="12" cy="13.156" r="1.285"></circle>
                      <circle cx="7.032" cy="17.486" r="1.285"></circle>
                      <circle cx="12" cy="17.486" r="1.285"></circle>
                    </g>
                  </svg>
                  {formatDate(blog?.createdAt as string)}
                </span>
                <h1 className="text-2xl font-bold text-gray-600 line-clamp-1">
                  {blog.title}
                </h1>
                <p className="width-auto  text-gray-600 flex-shrink line-clamp-2 h-14">
                  {blog.description}
                </p>

                <img
                  src={blog.img}
                  alt="img"
                  className="aspect-video rounded-md "
                  loading="lazy"
                />

                <div className="flex items-center gap-4 py-2">
                  <div className=" flex items-center text-gray-600 text-sm  hover:text-blue-400 transition duration-350 ease-in-out">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <g>
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                      </g>
                    </svg>
                    {blog?.commentsCount}
                  </div>
                  <div className=" flex items-center text-gray-600 text-sm  hover:text-red-600 transition duration-350 ease-in-out">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <g>
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                      </g>
                    </svg>
                    {blog?.likesCount}
                  </div>
                </div>
                {/* render blogs.myInterests.map in a flex div */}
                <div className="flex gap-2 items-center flex-wrap">
                  {blog.tags.map((tag) => (
                    <span
                      className="text-gray-600 bg-gray-200 px-2 py-1 rounded-full text-xs"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </ul>
          <Pagination
            className="!my-6 !ml-auto !w-fit !mr-6"
            count={Math.ceil(totalCount / limit)}
            color="secondary"
            shape="rounded"
            page={page}
            onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value)
            }}
          />
        </section>
      </main>

      <style>
        {`.overflow-y-auto::-webkit-scrollbar, .overflow-y-scroll::-webkit-scrollbar, .overflow-x-auto::-webkit-scrollbar, .overflow-x::-webkit-scrollbar, .overflow-x-scroll::-webkit-scrollbar, .overflow-y::-webkit-scrollbar, body::-webkit-scrollbar {
        display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-y-auto, .overflow-y-scroll, .overflow-x-auto, .overflow-x, .overflow-x-scroll, .overflow-y, body {
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */
        }

        .bg-dim-700 {
        --bg-opacity: 1;
        background-color: #192734;
        }


        svg.paint-icon {
        fill: currentcolor;
        }
`}
      </style>
    </div>
  )
}

export default PublicProfile
