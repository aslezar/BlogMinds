import { useNavigate, Link } from "react-router-dom"
import { BlogShortType } from "../definitions"
interface BlogCardProps {
  blog: BlogShortType
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate()
  return (
    <div className="container p-5    bg-white w-full border my-4 rounded-lg ">
      <div className=" lg:flex flex-row-reverse lg:items-center  gap-3">
        <img
          className="object-cover w-full mx-auto lg:mx-0 lg:w-52 aspect-video rounded-xl"
          src={blog.img}
          alt={blog.title}
        />

        <div className="mt-6  lg:mt-0 lg:mx-6">
          {blog.tags && (
            <div className="flex gap-1 items-center">
              {blog.tags.map((tag, index) => (
                <p
                  key={index}
                  className="text-xs bg-highlight w-fit text-white py-1 px-2 rounded-full capitalize"
                >
                  {tag}
                </p>
              ))}
            </div>
          )}

          <a
            href="#"
            className="block mt-3 text-2xl font-semibold text-gray-800 hover:underline md:text-3xl"
          >
            {blog.title}
          </a>

          <p className="mt-3 text-sm text-gray-500 md:text-sm">
            {blog.description.length > 150
              ? blog.description.slice(0, 150) + "..."
              : blog.description}
          </p>

          <Link
            to={`/blog/${blog._id}`}
            className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
          >
            Read more
          </Link>

          {blog.author && (
            <div className="flex items-center mt-6">
              <img
                className="object-cover object-center w-10 h-10 rounded-full"
                src={blog.author.profileImage}
                alt=""
              />

              <div className="mx-4">
                <h1
                  className="text-sm text-gray-700 hover:underline hover:cursor-pointer"
                  onClick={() => {
                    navigate(`/user/${blog.author._id}`)
                  }}
                >
                  {blog.author.name}
                </h1>
                {/* <p className="text-sm text-gray-500">Lead Developer</p> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogCard
