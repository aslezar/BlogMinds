import { Link } from "react-router-dom"
import { BlogCardType } from "../definitions"
import { format } from "date-fns/format" // Import date-fns under a namespace

interface BlogCardProps {
  blog: BlogCardType
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMMM yyyy")
  }
  return (
    <div className="container p-5    bg-white w-full border my-4 rounded-lg ">
      <div className=" lg:flex flex-row-reverse  justify-between lg:items-center  mr-3">
        <img
          className="object-cover w-full mx-auto lg:mx-0 lg:w-52 aspect-video rounded-xl mb-2"
          src={blog.img}
          alt={blog.title}
          loading="lazy"
        />
        <div className="mt-6  lg:mt-0 lg:mx-6">
          <div className="flex  items-end gap-3">
            {blog.author && (
              <div className="flex items-end ">
                <img
                  className="object-cover object-center w-6 aspect-square rounded-full"
                  src={blog.author.profileImage}
                  alt=""
                />

                <div className="ml-2">
                  <Link
                    className="text-[15px] text-gray-700 hover:underline hover:cursor-pointer"
                    to={`/user/${blog.author._id}`}
                  >
                    {blog.author.name}
                  </Link>
                </div>
              </div>
            )}
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mb-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>

              {blog.createdAt && (
                <p className="text-center text-gray-600 text-sm">
                  {formatDate(blog.createdAt)}
                </p>
              )}
            </div>
          </div>
          <Link
            to={`/blog/${blog._id}`}
            className="block mt-3 text-2xl font-semibold text-gray-800 hover:underline md:text-3xl"
          >
            {blog.title}
          </Link>

          <p className="mt-2  text-gray-500">{blog.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mt-5">
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 aspect-square"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              {blog?.likesCount || 0}
            </div>
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 aspect-square"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>

              {blog?.commentsCount || 0}
            </div>
            <div className="flex gap-1 items-center">
              {blog?.views || 0} reads
            </div>
          </div>
          {blog.tags && (
            <div className="flex gap-1 items-center divide-x-2 divide-gray-300 mt-5">
              {blog.tags.map((tag, index) => (
                <p
                  key={index}
                  className="text-xs text-gray-500  px-1  capitalize"
                >
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogCard
