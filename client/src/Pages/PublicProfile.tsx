import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserProfile } from "../api"
import { Profile } from "../definitions"
import { format } from "date-fns/format"
import Loader from "../components/Loader"

const PublicProfile = () => {
  const userId = useParams().id
  const [user, setUser] = useState<Profile | null>(null)
  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy")
  }
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (userId) {
          const response = await getUserProfile(userId)
          setUser(response.data.user)
          console.log(response.data)
        }
      } catch (error) {
        console.log("Error fetching user profile", error)
      }
    }
    fetchUserProfile()
  }, [userId])

  if (!user) return <Loader />

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
                        alt=""
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
                        Joined {formatDate(user?.createdAt as string)}
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
                <div className="flex flex-col text-right">
                  <button className=" justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  max-w-max border bg-transparent border-blue-500 text-blue-500  hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-none grid grid-cols-3 gap-7  p-6">
            {user?.blogs.map((blog) => (
              <li className="max-w-sm mx-auto flex flex-col gap-2">
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
                <p className="width-auto  text-gray-600 flex-shrink line-clamp-2">
                  {blog.description}
                </p>

                <img
                  src={blog.img}
                  alt=""
                  className="aspect-video rounded-md "
                />

                <div className="flex items-center py-4">
                  <div className="flex-1 flex items-center text-gray-600 text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <g>
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                      </g>
                    </svg>
                    12.3 k
                  </div>
                  <div className="flex-1 flex items-center text-gray-600 text-xs  hover:text-green-400 transition duration-350 ease-in-out">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <g>
                        <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                      </g>
                    </svg>
                    14 k
                  </div>
                  <div className="flex-1 flex items-center text-gray-600 text-xs  hover:text-red-600 transition duration-350 ease-in-out">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <g>
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                      </g>
                    </svg>
                    14 k
                  </div>
                  <div className="flex-1 flex items-center text-gray-600 text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <g>
                        <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                        <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                {/* render blogs.myInterests.map in a flex div */}
              </li>
            ))}
          </ul>
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
